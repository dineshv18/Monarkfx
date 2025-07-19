import { prisma } from "../config/db.js";

const generateReferralCode = async () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let referralCode;
  let isUnique = false;

  while (!isUnique) {
    // Generate a 6-character referral code
    referralCode = "";
    for (let i = 0; i < 6; i++) {
      referralCode += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    // Check if the referral code already exists
    const existingAffiliate = await prisma.affiliate.findUnique({
      where: { referralCode },
    });

    if (!existingAffiliate) {
      isUnique = true;
    }
  }

  return referralCode;
};

export { generateReferralCode };
