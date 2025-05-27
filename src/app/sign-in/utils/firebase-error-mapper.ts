export function mapFirebaseError(err: any): string {
    switch (err?.code) {
      case "auth/invalid-phone-number":
        return "Invalid phone number.";
      case "auth/missing-phone-number":
        return "Phone number required.";
      case "auth/too-many-requests":
        return "Too many requests.";
      case "auth/quota-exceeded":
        return "Quota exceeded.";
      case "auth/network-request-failed":
        return "Network error.";
      case "auth/captcha-check-failed":
        return "reCAPTCHA failed.";
      case "auth/operation-not-allowed":
        return "Auth not allowed.";
      case "auth/invalid-api-key":
        return "Invalid API key.";
      case "auth/internal-error":
        return "Internal error.";
      case "auth/code-expired":
        return "Code expired.";
      case "auth/invalid-verification-code":
        return "Invalid verification code.";
      default:
        return "Something went wrong.";
    }
  }
  