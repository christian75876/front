import styles from './profile.css';


export function Profile() {

  const pageContent = `
    <table class="${styles['user-details-table']}>
      <tr><th>ID</th><td></td></tr>
      <tr><th>Name</th><td>}</td></tr>
      <tr><th>User</th><td></td></tr>
      <tr><th>Password</th><td</td></tr>
      <tr><th>Clan</th><td></td></tr>
      <tr><th>Phone</th><td></td></tr>
    </table>
    `

  const logic = () => {

  }

  return {
    pageContent,
    logic
  }

}