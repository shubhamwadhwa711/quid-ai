export const mergeProfiles = (quidAIProfile: any, LinkedInProfile: any) => {
  console.log("LinkedInProfile", LinkedInProfile);
  console.log("quidAIProfile", quidAIProfile);
  return {
    ...quidAIProfile,
    image: quidAIProfile?.image || LinkedInProfile?.profile_picture_url_large,
    skill: quidAIProfile?.skill || LinkedInProfile?.skills,
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
      name:
        quidAIProfile?.country?.name ||
        LinkedInProfile?.primary_locale?.country,
    },
    headline: quidAIProfile?.headline || LinkedInProfile?.headline,
    linkedin_url:
      quidAIProfile?.linkedin_url ||
      `linkedin.com/in/${LinkedInProfile?.vanityName}`,
    education: [
      // ...(quidAIProfile?.education || []),
      ...(LinkedInProfile?.education || []),
    ],
    projects: quidAIProfile?.projects || LinkedInProfile?.projects,
    summary: quidAIProfile?.summary || LinkedInProfile?.headline,
  };
};
