import styles from './home.css';

export function HomeScene() {

  const pageContent = ` 
    <div class="${styles.container}">
      <h1 class="${styles.title}">Welcome to Our Coding Education Platform</h1>
      <p class="${styles.description}">Learn to code with ease and efficiency!</p>
      <ul class="${styles.featureList}">
        <li class="${styles.featureItem}">Comprehensive Curriculum: Our platform offers a comprehensive curriculum covering a wide range of programming languages and technologies.</li>
        <li class="${styles.featureItem}">Interactive Learning: Engage with hands-on coding challenges, projects, and quizzes to reinforce your learning.</li>
        <li class="${styles.featureItem}">Expert Instructors: Learn from industry experts who provide guidance, support, and mentorship throughout your coding journey.</li>
        <li class="${styles.featureItem}">Flexible Learning: Access our platform anytime, anywhere, and learn at your own pace to accommodate your busy schedule.</li>
      </ul>
      <p class="${styles.ctaText}">Ready to embark on your coding journey? Sign up now and start coding!</p>
    </div>
  `;

  const logic = () => {
    // Add logic here if needed
  };

  return {
    pageContent,
    logic
  };
}


