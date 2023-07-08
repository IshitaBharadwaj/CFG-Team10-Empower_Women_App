const Mentee = require('./mentee');
const Mentor = require('./mentor'); 
async function matchMenteeWithMentors(menteeId) {
  try {
    const mentee = await Mentee.findOne({ _id: menteeId });
    const menteeLanguages = mentee.languagesSpoken.split(',').map((lang) => lang.trim());
    const menteeQualifications = mentee.qualification.split(',').map((qual) => qual.trim());
    const menteeAvailability = mentee.availableDays.split(',').map((day) => day.trim());

    const mentors = await Mentor.findAll({ mentorAssigned: false });

    mentors.forEach((mentor) => {
      const mentorLanguages = mentor.languagesSpoken.split(',').map((lang) => lang.trim());
      const mentorQualifications = mentor.qualification.split(',').map((qual) => qual.trim());
      const mentorAvailability = mentor.availableDays.split(',').map((day) => day.trim());

      const commonLanguages = mentorLanguages.filter((language) => menteeLanguages.includes(language));
      const commonQualifications = mentorQualifications.filter((qual) => menteeQualifications.includes(qual));
      const commonAvailability = mentorAvailability.filter((day) => menteeAvailability.includes(day));

      if (commonLanguages.length > 0 && commonQualifications.length > 0 && commonAvailability.length > 0) {
        const menteeName = mentee.findOne({}) 
        const mentorName =
        mentor.menteeAssigned = true;
        mentor.menteeNameAssigned = 
        mentee.mentorAssigned = true;
        mentor.save();
        mentee.save();
        console.log(`Mentor ${mentor.username} matched with Mentee ${mentee.username}`);
      }
    });
  } catch (error) {
    console.error(error);
  }
}

// matchMenteeWithMentors(menteeIdToMatch);
// hululul
// async function matchMentorsAndMentees() {
    // try {
    //   const mentors = await Mentor.findAll({ where: { mentorAssigned: false } });
    //   const mentees = await Mentee.findAll({ where: { menteeAssigned: false } });
    //   // Dummy data for mentors
//   const mentors = [
//     {
//       username: "Mentor1",
//       languagesSpoken: "English, French",
//       qualification: "Bachelor's Degree, Master's Degree",
//       availableDays: "Monday, Wednesday",
//       menteeAssigned: false,
//       save: () => {},
//     },
//     {
//       username: "Mentor2",
//       languagesSpoken: "English, Spanish",
//       qualification: "Bachelor's Degree, Ph.D.",
//       availableDays: "Tuesday, Thursday",
//       menteeAssigned: false,
//       save: () => {},
//     },
//   ];
  
//   // Dummy data for mentees
//   const mentees = [
//     {
//       username: "Mentee1",
//       languagesSpoken: "English, French",
//       qualification: "Bachelor's Degree",
//       availableDays: "Monday, Tuesday",
//       mentorAssigned: false,
//       save: () => {},
//     },
//     {
//       username: "Mentee2",
//       languagesSpoken: "English, German",
//       qualification: "Master's Degree",
//       availableDays: "Tuesday, Wednesday",
//       mentorAssigned: false,
//       save: () => {},
//     },
//   ];
  
  //     mentors.forEach((mentor) => {
  //       const mentorLanguages = mentor.languagesSpoken.split(',').map((lang) => lang.trim());;
  //       const mentorQualifications = mentor.qualification.split(',').map((qual) => qual.trim());
  //       const mentorAvailability = mentor.availableDays.split(',').map((day) => day.trim());
  
  //       mentees.forEach((mentee) => {
  //         const menteeLanguages = mentee.languagesSpoken.split(',').map((lang) => lang.trim());
  //         const commonLanguages = mentorLanguages.filter((language) => menteeLanguages.includes(language));
  
  //         const menteeQualifications = mentee.qualification.split(',').map((qual) => qual.trim());
  //         const commonQualifications = mentorQualifications.filter((qual) => menteeQualifications.includes(qual));
  
  //         const menteeAvailability = mentee.availableDays.split(',').map((day) => day.trim());
  //         const commonAvailability = mentorAvailability.filter((day) => menteeAvailability.includes(day));
  
  //         if (commonLanguages.length > 0 && commonQualifications.length > 0 && commonAvailability.length > 0) {
  //           mentor.menteeAssigned = true;
  //           mentee.mentorAssigned = true;
  //           console.log(mentor)
  //           console.log(mentee)
  //           mentor.save();
  //           mentee.save();
  
  //           console.log(`Mentor ${mentor.username} matched with Mentee ${mentee.username}`);
  //         }
  //         else
  //         {
  //           console.log('No mentor is available')
  //         }
  //       });
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
  
  // matchMentorsAndMentees();