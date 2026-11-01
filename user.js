// Firefox security and privacy configuration
//
// Place this file in your Firefox profile directory while Firefox is closed.
// Preferences in user.js are reapplied each time Firefox starts. See readme.md
// for installation, compatibility notes, and instructions for undoing changes.
//
// Designed for a current, regularly updated Firefox release. Firefox may
// ignore preferences that are unavailable or change their behavior over time.

// --- Safer connections -----------------------------------------------------
// Upgrade HTTP connections to HTTPS. Firefox will show a warning if a site
// cannot be upgraded; you can choose an exception when you trust that site.
user_pref("dom.security.https_only_mode", true);

// Block insecure active content embedded in HTTPS pages.
user_pref("security.mixed_content.block_active_content", true);

// Display internationalized domain names as punycode to make some look-alike
// domains easier to spot. This makes non-ASCII domain names less readable.
user_pref("network.IDN_show_punycode", true);

// --- Fraud, malware, and add-on protection --------------------------------
// Keep Firefox's Safe Browsing checks enabled. Some download checks can send
// information about a download to the Safe Browsing service; see readme.md.
user_pref("browser.safebrowsing.phishing.enabled", true);
user_pref("browser.safebrowsing.malware.enabled", true);
user_pref("browser.safebrowsing.downloads.enabled", true);
user_pref("browser.safebrowsing.downloads.remote.enabled", true);
user_pref("extensions.blocklist.enabled", true);

// --- Tracking protection --------------------------------------------------
// Block known trackers in all windows, including social trackers,
// cryptominers, and known fingerprinters.
user_pref("privacy.trackingprotection.enabled", true);
user_pref("privacy.trackingprotection.socialtracking.enabled", true);
user_pref("privacy.trackingprotection.cryptomining.enabled", true);
user_pref("privacy.trackingprotection.fingerprinting.enabled", true);

// Reject tracking cookies and partition other cross-site cookies. This is
// Firefox's Total Cookie Protection behavior; some embedded services may need
// a site exception or permission to access their cookies.
user_pref("network.cookie.cookieBehavior", 5);
user_pref("network.cookie.cookieBehavior.pbmode", 5);

// Ask participating sites not to sell or share personal data. This is a
// signal to websites, not a technical guarantee that they will comply.
user_pref("privacy.globalprivacycontrol.enabled", true);

// Strip known tracking parameters from navigation URLs where supported.
user_pref("privacy.query_stripping.enabled", true);
user_pref("privacy.query_stripping.enabled.pbmode", true);

// --- Data collection -------------------------------------------------------
// Reduce Firefox telemetry and studies. This does not disable security
// updates, Safe Browsing, or every network connection made by Firefox.
user_pref("toolkit.telemetry.enabled", false);
user_pref("datareporting.healthreport.uploadEnabled", false);
user_pref("app.shield.optoutstudies.enabled", false);
user_pref("datareporting.policy.dataSubmissionEnabled", false);
