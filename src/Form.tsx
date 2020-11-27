import { Button } from "@material-ui/core";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import MaterialUIInput from "@material-ui/core/Input";

function Form() {
  const { control, handleSubmit, reset } = useForm();

  const onSubmit = () => {
    reset();
  };

  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          as={MaterialUIInput}
          name="name"
          placeholder="name"
          control={control}
          defaultValue=""
          className="materialUIInput"
        />
        <Controller
          as={MaterialUIInput}
          name="preview"
          placeholder="preview"
          control={control}
          defaultValue=""
          className="materialUIInput"
        />
        <Button type="submit">Done</Button>
      </form>
    </div>
  );
}

export default Form;
