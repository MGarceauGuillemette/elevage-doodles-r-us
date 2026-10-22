/**
 * Helpers for constructing contact links.
 *
 * Pure functions keep URL formatting independent of
 * presentation components and make it easy to unit test.
 */

/**
 * Converts an email address to a mailto: URL.
 *
 * @param email - Verified public email address.
 * @returns A URL suitable for an HTML anchor.
 */
export function createEmailUrl(email: string): string {
    return `mailto:${email.trim()}`;
}

/**
 * Converts a phone number to a tel: URL.
 *
 * Formatting characters are removed while preserving
 * a leading international dialing prefix.
 *
 * @param phone - Human-readable telephone number.
 * @returns A normalized telephone URL.
 */
export function createPhoneUrl(phone: string): string {
    const normalized = phone.replace(/[^\d+]/g, "");

    return `tel:${normalized}`;
}

/**
 * Validates a Facebook link before displaying it.
 *
 * Only secure HTTPS links to Facebook or Messenger
 * domains are accepted.
 *
 * @param value - A candidate Facebook profile/page URL.
 * @returns True when the URL uses an approved domain.
 */
export function isFacebookUrl(value: string): boolean {
    try {
        const url = new URL(value);

        const allowedHosts = [
            "facebook.com",
            "www.facebook.com",
            "m.facebook.com",
            "messenger.com",
            "www.messenger.com",
            "m.me",
        ];

        return (
            url.protocol === "https:" &&
            allowedHosts.includes(url.hostname) &&
            url.username === "" &&
            url.password === ""
        );
    } catch {
        return false;
    }
}