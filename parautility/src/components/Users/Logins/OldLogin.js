import React, {useState} from "react";
import {useNavigate} from "react-router";
import emailjs from "@emailjs/browser";

async function sha256(message) {
    // encode as UTF-8
    const msgBuffer = new TextEncoder().encode(message);

    // hash the message
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

    // convert ArrayBuffer to Array
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    // convert bytes to hex string
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

const OldLogin = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "user@server.extension",
        password: ""
    });

    // These methods will update the state properties.
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    const sendEmail = (e, templateParams) => {
        e.preventDefault();

        emailjs.init('Yhbs32kTTPFzp9TMU')
        emailjs.send('service_7xjki0g', 'template_gke6mby', templateParams)
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    };

    // This function will handle the submission.
    async function onSubmit(e) {
        e.preventDefault();

        if (form.password1 !== form.password2) {
            alert("Passwords do not match. Please Try Again");
            return;
        }

        // When a post request is sent to the "create" url, we'll add a new record to the database.
        const currentPerson = {...form};

        const getUserByEmail = async () => {
            const response = await fetch(`http://localhost:5000/user-by-email`, {
                method: "POST", headers: { "Content-Type": "application/json"}, body: JSON.stringify(currentPerson)
            });

            const user = await response.json();
            return user;
        }

        const db_user = await getUserByEmail().then(user => {
            return user;
        });

        const pw_hash = await sha256(form.password + db_user.salt);
        console.log("Checking Hash:" + pw_hash);
        console.log("Stored Hash:" + db_user.pw_hash);

        if (pw_hash === db_user.pw_hash) {
            navigate("/login-landing");
        }
        else {
            alert("Email or Password Incorect. Please Try Again");
            return;
        }
    }

  return (
    <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="form-group mt-3">
            <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                value={form.email}
                onChange={(e) => updateForm({ email: e.target.value })}
              />
            </div>
            <div className="form-group mt-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={form.password1}
              onChange={(e) => updateForm({ password: e.target.value })}
            />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary" onSubmit = {onSubmit}>
                Submit
              </button>
            </div>
            <p className="text-center mt-2">
              Forgot <a href="javascript:void(0)">password?</a>
            </p>
          </div>
        </form>
      </div>
  )
 }


export default OldLogin

