import { Button } from "@material-ui/core";
import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import { useForm } from "react-hook-form";
import "./SendMail.css";
import { useDispatch } from "react-redux";
import { closeSendMessage } from "../../../features/mailSlice";
import { db } from "../../firebase";
import firebase from "firebase";

const SendMail = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (formData) => {
    console.log(formData);
    db.collection("emails").add({
      to: formData.to,
      subject: formData.subject,
      body: formData.body,
      timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    db.collection("emails")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((docu) => {
          if (docu.data().to === "SHIVAMSINGH0101@iikgp.ac.in") {
            console.log("Found User: ", "SHIVAMSINGH0101@iikgp.ac.in");
            db.collection("emails").doc(docu.id).collection("starred").add({
              isStar: "false",
            });
          }
          // console.log(`${docu.id} => ${docu.data().to}`);
        });
      });

    dispatch(closeSendMessage());
  };

  return (
    <div className="sendMail">
      <div className="sendMail__header">
        <h3>New Message</h3>
        <CloseIcon
          className="sendMail__close"
          onClick={() => dispatch(closeSendMessage())}
        />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          name="to"
          placeholder="To"
          type="email"
          ref={register({ required: true })}
        ></input>
        {errors.to && <p className="sendMail__error"> To is required! </p>}

        <input
          name="subject"
          placeholder="Subject"
          type="text"
          ref={register({ required: true })}
        ></input>
        {errors.subject && (
          <p className="sendMail__error"> Subject is required! </p>
        )}

        <input
          name="body"
          placeholder="Body"
          type="text"
          className="sendMail__message"
          ref={register({ required: true })}
        ></input>
        {errors.body && <p className="sendMail__error"> Body is required! </p>}

        <div className="sendMail__options">
          <Button
            className="sendMail__send"
            variant="contained"
            color="primary"
            type="submit"
          >
            Send
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SendMail;
