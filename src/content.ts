
export interface CardData {
  title: string;
  hint: string;
  message: string;
  image: string;
  alt: string;
}

export const experienceData = {
  intro: {
    title: 'My Pallu ❤️',
    subtitle: 'Mera Babu, My Queen of Heart ❤️',
  },

  cards: [
    {
      title: 'Our Story ❤️',
      hint: 'Tap to reveal',
      message: 'Hum aapse tab mile jab kisi se milna nahi chahte the. Pata nahi kab aap itni apni ban gayi.',
      image: 'photos/1.jpg',
      alt: 'Our Memory 1'
    },
    {
      title: 'My Lucky Charm 💗',
      hint: 'Tap to reveal',
      message: 'Aapke aane se meri life khoobsurat ho gayi. Main bahut lucky hoon ki aap meri life mein hain.',
      image: 'photos/2.jpg',
      alt: 'Our Memory 2'
    },
    {
      title: 'My Happiness 🥹',
      hint: 'Tap to reveal',
      message: 'Meri happiness aur sadness dono aapse judi hain. Aap meri favourite person hain.',
      image: 'photos/3.jpg',
      alt: 'Our Memory 3'
    },
    {
      title: 'Our Cute Fights 😂',
      hint: 'Tap to reveal',
      message: 'Hamari ladai aur nok-jhok mein bhi alag hi maza hai. Bas aise hi ladte-jhagadte rehna hai!',
      image: 'photos/4.jpg',
      alt: 'Our Memory 4'
    },
  ] as CardData[],

  letter: `My Dear Pallu ❤️
Pata nahi kab aur kaise aap meri life ka itna special hissa ban gayi.
Aapke aane se meri life aur bhi khoobsurat ho gayi. 
Aap mere liye bahut lucky hai.
Meri har khushi aur udaasi aapse judi hai.
I LOVE YOU, MY QUEEN OF HEART!

Forever Yours,
Ashish`,

  heart: {
    line1: 'I Love You, My Pallu ❤️',
    line2: 'My Forever Favourite Person ❤️',
  },
};
