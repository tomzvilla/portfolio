const projects = [
    {
      shortname: 'cienciaconecta',
      title: 'CienciaConecta',
      technologies: [{name: 'React'}, {name: 'Redux'}, {name: 'SASS'}, {name: 'NodeJS'}, {name: 'MongoDB'}],
      description: 'An application for managing the Science and Technology Fair of the Province of Cordoba. Developed and desgined the project frontend, including role-based authentication and authorization, session and user management.',
      longDescription: 'I lead the development of a Final Degree project (alongside 3 other developers), a SPA (Single Page Application) built with ReactJS, NodeJS, Express, MongoDB, Redis, and Bull. This application was tailored for managing the Science and Technology Fair of the Province of Córdoba. As the lead developer, I focused on crafting the FrontEnd, which encompassed intricate features such as role-based authentication and authorization, session management, and user administration. The developed functionalities includes: user management, project management, science fair management, evaluator management, notifications, mailing, and project evaluation.  Collaborating closely with the client from the Ministry of Education and the Ministery of Science and Technology, I conducted extensive meetings to gather and refine project requirements. These requirements were then meticulously translated into user stories using Jira, ensuring clarity and alignment with stakeholder expectations. Upon completion, I orchestrated the deployment of the application utilizing Netlify and AWS, ensuring seamless accessibility and reliability for end-users.',
      media: 'CienciaConecta.png',
      // video: 'cienciaconecta.webp'
      projectGithub: 'https://github.com/tomzvilla/cienciaConecta',
      projectShowcase: ''
    },
    {
      shortname: 'wordle',
      title: 'Wordle Clone',
      technologies: [{name: 'React'}, {name: 'Redux'}, {name: 'TypeScript'}, {name: 'Tailwind'}],
      description: 'A website that allows you to play the famous game "Wordle" infinetly. Made to learn TypeScript and Tailwind. Full responsive layout with dark/light mode.',
      longDescription: "I undertook a personal project to create a replica of the popular game Wordle using React, Redux, and Vite, all written in Typescript and styled with Tailwind CSS. This initiative was aimed at practicing and refining my skills in these modern technologies. Using React for the frontend and Redux for state management, I developed an intuitive and enjoyable gaming interface. By incorporating Typescript, I ensured code robustness and improved development workflow. The application's visual design was achieved using Tailwind CSS, demonstrating my proficiency in modern styling techniques. Through this project, I deepened my expertise in these technologies, preparing myself for future web development projects.",
      media: 'Wordle.png',
      projectGithub: 'https://github.com/tomzvilla/wordle',
      projectShowcase: 'https://tomzvilla.github.io/wordle/'
    },
    {
      shortname: 'project-management-site',
      title: 'The Dojo - Project Managament',
      technologies: [{name: 'React'}, {name: 'SASS'}, {name: 'Firebase'}],
      description: 'The Dojo is a project management website that allows you and your team to create different projects, assign them to a member of your team and set deadlines. It has a dashboard where you can filter projects, and make comments on each of them.',
      longDescription: "During my early stages of learning React and the Context API, I embarked on developing The Dojo, a comprehensive project management and calendar application. The platform enables users and their teams to create distinct projects, allocate them to team members, and establish deadlines. With an intuitive dashboard, users can efficiently filter projects and leave comments on each task. Leveraging Firebase for hosting and data storage, The Dojo ensures seamless accessibility and reliable data management. This project served as an invaluable learning experience, allowing me to gain proficiency in React, the Context API, as well as authentication and authorization mechanisms.",
      media: 'TheDojo.png',
      projectGithub: '',
      projectShowcase: 'https://thedojosite-80d90.web.app'
    }
];

export { projects }