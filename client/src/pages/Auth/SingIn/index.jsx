import React from "react";
import { Box, Heading, Flex, Input, Button } from "@chakra-ui/react";
import { PasswordInput } from "@/components/ui/password-input";
import { Field } from "@/components/ui/field";
import { Alert } from "@/components/ui/alert";
import { useFormik } from "formik";
import validationSchema from "./validation";
import { fetchLogin } from "@/Api";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router";

function SingIn() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema,
    onSubmit: async (values, bag) => {
      try {
        const loginResponse = await fetchLogin({
          email: values.email,
          password: values.password,
        }); 
        login(loginResponse); // giriş yapıldıktan sonra oturum işlemi authContext de fonk
        navigate("/profile");
        console.log("registerResponce :>> ", loginResponse);
      } catch (error) {
        bag.setErrors({ general: error.response.data.message });
      }
    },
  });

  return (
    <div>
      <Flex align="center" justifyContent="center" width="Full">
        <Box pt="10">
          <Box textAlign="center">
            <Heading>Sing In </Heading>
          </Box>
          {formik.errors.general && (
            <Alert status="error">{formik.errors.general}</Alert>
          )}
          <Box my={5} textAlign="left">
            <form onSubmit={formik.handleSubmit}>
              <Field
                label="Email"
                required
                helperText=""
                invalid={formik.touched.email && formik.errors.email}
                errorText={formik.errors.email}
              >
                <Input
                  placeholder="Enter your email"
                  name="email"
                  type="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  mb={3}
                />
              </Field>

              <Field
                label="Password"
                required
                invalid={formik.touched.password && formik.errors.password}
                errorText={formik.errors.password}
              >
                <PasswordInput
                  type="password"
                  name="password"
                  placeholder="Şifrenizi girin"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  autoComplete=" RC current-password"
                />
              </Field>

              <Button colorPalette="blue" width="full" mt={5} type="Submit">
                Giriş Yap
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </div>
  );
}

export default SingIn;
