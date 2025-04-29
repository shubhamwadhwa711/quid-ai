export const MergeProfile = (quidAIProfile, LinkedInProfile) => {
  console.log("LinkedInProfile", LinkedInProfile);
  return {
    ...quidAIProfile,
    image: quidAIProfile?.image || LinkedInProfile.picture,
    user: {
      ...quidAIProfile.user,
      first_name:
        quidAIProfile?.user?.first_name || LinkedInProfile.localizedFirstName,
      last_name:
        quidAIProfile?.user?.last_name || LinkedInProfile?.localizedLastName,
      email: quidAIProfile?.user?.email || LinkedInProfile?.email,
    },
    country: {
      ...quidAIProfile.country,
      name: quidAIProfile?.country?.name || LinkedInProfile?.locale?.country,
    },
    headline: quidAIProfile?.headline || LinkedInProfile?.localizedHeadline,
    linkedin_url: quidAIProfile?.linkedin_url || `linkedin.com/in/${LinkedInProfile?.vanityName}`
  };
};
