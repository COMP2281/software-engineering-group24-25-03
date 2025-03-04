import {useState} from "react";

const manage_accounts = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    console.log("Submit me")
    // const result = await dispatch(login({username, password}));
    // if (login.fulfilled.match(result)) {
    //   // Redirect on successful login
    //   navigate('/');
    // }
  }

  /*
   - Change profile picture
   - Change username
   - email
   - first name
   - last name
   */
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username'/>
        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password'/>
        <button type="submit">Kebab</button>
      </form>
    </div>
  )
}

const notifications = () => {
  /*
   - send emails
   */
  return (
    <div>
      Notifications
    </div>
  )
}

const security = () => {
  /*
   - Change password
   */
  return (
    <div>
      Security
    </div>
  )
}

const SettingsPage = ({page}) => {

  switch (page) {
    case "manage_account":
      return manage_accounts();
    case "notifications":
      return notifications();
    case "security":
      return security();
  }

}

export default SettingsPage;
