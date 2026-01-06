/**
 * Spiralverse SDK (ssdk.ts) - RWP v2 Implementation
 * 
 * Implements the RWP v2 protocol envelope structure with:
 * - Domain-separated HMAC-SHA256 signatures
 * - Roundtable multi-signature governance
 * - Six Sacred Tongues (KO, AV, RU, CA, UM, DR)
 * - Timestamp + nonce replay protection
 * 
 * @version 2.0.0
 * @author Issac Davis
 * @license MIT
 */

import { createHmac, randomBytes } from 'crypto';

// ========== TYPES ==========

export type Tongue = 'KO' | 'AV' | 'RU' | 'CA' | 'UM' | 'DR';
export type PolicyTier = 'standard' | 'strict' | 'secret' | 'critical';

export interface RWP2Envelope {
  ver: '2';
  tongue: Tongue;
  aad: string;  // sorted key=value pairs
  ts: number;   // Unix timestamp (seconds)
  nonce: string;  // Base64URL random bytes
  kid: string;   // key identifier
  payload: string;  // Base64URL encoded data
  sigs: Array<{
    tongue: Tongue;
    kid: string;
    sig: string;
  }>;
}

export interface KeyRing {
  [kid: string]: Buffer | string;
}

// ========== BASE64URL HELPERS ==========

export function b64uEncode(buf: Buffer): string {
  return buf.toString('base64url');
}

export function b64uDecode(str: string): Buffer {
  return Buffer.from(str, 'base64url');
}

// ========== CANONICAL STRING ==========

function canonicalString(env: RWP2Envelope): string {
  return `${env.ver}\n${env.tongue}\n${env.aad}\n${env.ts}\n${env.nonce}\n${env.kid}\n${env.payload}`;
}

// ========== DOMAIN-SEPARATED HMAC ==========

function signDomain(
  canonical: string,
  key: Buffer,
  tongue: Tongue
): string {
  const domain = `spiralverse:rwp2:${tongue}`;
  const hmac = createHmac('sha256', key);
  hmac.update(domain);
  hmac.update(canonical);
  return hmac.digest('hex');
}

// ========== CORE SDK FUNCTIONS ==========

/**
 * Sign an RWP2 envelope with specified tongues
 * @param env Partial envelope (without signatures)
 * @param keyring Keys indexed by kid
 * @param signTongues Tongues to sign with
 * @returns Complete signed envelope
 */
export function signRWP2(
  env: Omit<RWP2Envelope, 'sigs'>,
  keyring: KeyRing,
  signTongues: Tongue[]
): RWP2Envelope {
  const canonical = canonicalString({ ...env, sigs: [] });
  const key = keyring[env.kid];
  if (!key) throw new Error(`Missing key: ${env.kid}`);
  
  const keyBuf = Buffer.isBuffer(key) ? key : Buffer.from(key, 'hex');
  
  const sigs = signTongues.map(tongue => ({
    tongue,
    kid: env.kid,
    sig: signDomain(canonical, keyBuf, tongue)
  }));
  
  return { ...env, sigs };
}

/**
 * Verify RWP2 envelope signatures
 * @param env Signed envelope
 * @param keyring Keys indexed by kid
 * @param replayWindowSec Max age in seconds (default 60)
 * @returns Array of valid tongues
 */
export function verifyRWP2(
  env: RWP2Envelope,
  keyring: KeyRing,
  replayWindowSec: number = 60
): Tongue[] {
  // Check timestamp
  const now = Math.floor(Date.now() / 1000);
  const age = now - env.ts;
  if (age < 0 || age > replayWindowSec) {
    throw new Error(`Envelope outside replay window: ${age}s`);
  }
  
  const canonical = canonicalString(env);
  const validTongues: Tongue[] = [];
  
  for (const sig of env.sigs) {
    const key = keyring[sig.kid];
    if (!key) continue;
    
    const keyBuf = Buffer.isBuffer(key) ? key : Buffer.from(key, 'hex');
    const expected = signDomain(canonical, keyBuf, sig.tongue);
    
    if (sig.sig === expected) {
      validTongues.push(sig.tongue);
    }
  }
  
  return validTongues;
}

// ========== ROUNDTABLE POLICIES ==========

const POLICY_REQUIREMENTS: Record<PolicyTier, Tongue[]> = {
  standard: ['AV'],
  strict: ['KO', 'RU'],
  secret: ['KO', 'RU', 'UM'],
  critical: ['KO', 'RU', 'UM', 'CA']
};

/**
 * Enforce Roundtable policy
 * @param validTongues Tongues that passed signature verification
 * @param policy Policy tier to enforce
 * @returns true if policy satisfied
 */
export function enforceRoundtable(
  validTongues: Tongue[],
  policy: PolicyTier
): boolean {
  const required = POLICY_REQUIREMENTS[policy];
  return required.every(t => validTongues.includes(t));
}

// ========== SPELL-TEXT RENDERING (OPTIONAL) ==========

// Prefix/suffix tables for rendering signatures as spell-text
const PREFIX = ['xa', 'be', 'ci', 'du', 'ef', 'go', 'ha', 'ij',
               'ke', 'la', 'mi', 'no', 'pi', 'qu', 'ra', 'st'];

const SUFFIX = ['rn', 'th', 'xe', 'yl', 'az', 'en', 'or', 'un',
               'ak', 'el', 'im', 'ox', 'ar', 'et', 'on', 'up'];

/**
 * Render a signature as spell-text (for audit logs)
 * @param sig Hex signature
 * @returns Spell-text representation
 */
export function renderSigAsSpelltext(sig: string): string {
  const bytes = Buffer.from(sig.slice(0, 16), 'hex');
  let spell = '';
  for (let i = 0; i < bytes.length; i += 2) {
    const b1 = bytes[i] >> 4;
    const b2 = bytes[i + 1] >> 4;
    spell += PREFIX[b1] + SUFFIX[b2] + ' ';
  }
  return spell.trim();
}

// ========== EXAMPLE USAGE ==========

/*
import { signRWP2, verifyRWP2, enforceRoundtable, b64uEncode } from './ssdk';
import { randomBytes } from 'crypto';

const masterKey = Buffer.from([...Array(32).keys()]); // demo key
const env = {
  ver: '2' as const,
  tongue: 'AV' as const,
  aad: 'chan=init;service=gateway',
  ts: Math.floor(Date.now() / 1000),
  nonce: b64uEncode(randomBytes(16)),
  kid: 'k02',
  payload: b64uEncode(Buffer.from('Hello world'))
};

const signed = signRWP2(env, { k02: masterKey }, ['AV']);
console.log('Signed envelope:', signed);

const valid = verifyRWP2(signed, { k02: masterKey });
console.log('Valid tongues:', valid);

const ok = enforceRoundtable(valid, 'standard');
console.log('Policy OK?', ok);
*/
