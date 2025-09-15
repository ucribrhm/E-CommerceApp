import { fetchProduct, updateProduct } from "@/Api";
import React from "react";
import { Formik, FieldArray, Form } from "formik";
import { useNavigate, useParams } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Fieldset, Input, Textarea, Box, Button } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import validationSchema from "./validation";
import { message } from "antd";
function ProductEditDetail() {
  const queryClient = useQueryClient(); //invalidateQueries kullanmak için gerekli
  const navigate = useNavigate(); //yönlendirme için
  const { product_id } = useParams();

  const { isPending, error, data } = useQuery({
    queryKey: ["admin:products", product_id],
    queryFn: () => fetchProduct(product_id),
  });

  const UpdateMutations = useMutation({
    mutationFn: ({ values, product_id }) => updateProduct(values, product_id),
    onSuccess: () => {
      // silme işlemi yapınca sayfayıo yenilesin diye sorguyu sıfırlıyor yeniden çalıştırıyor bir nevi
      queryClient.invalidateQueries({ queryKey: ["admin:products"] });
      queryClient.invalidateQueries({ queryKey: ["product"] });
      queryClient.refetchQueries({ queryKey: ["admin:products"] });
      queryClient.refetchQueries({ queryKey: ["product"] });
      message.success({
        content: "Ürün Başarı ile güncellendi",
        key: "product_update ",
        duration: 2,
      });
      navigate("/admin/products");
    },
  });

  const handleSubmit = async (values) => {
    message.loading({ content: "Loading...", key: "product_update " });
    console.log("values :>> ", values);
    try {
      UpdateMutations.mutate({ values, product_id });
    } catch (error) {
      message.error("Ürün güncellenemedi! lütfen daha sonra tekrar deneyiniz");
    }
  };
  if (isPending) return <div>"Loading...";</div>;
  if (error) return <div>"An error has occurred: " + error.message;</div>;

  return (
    <div>
      <Box>
        <Formik
          initialValues={{
            title: data.title,
            description: data.description,
            price: data.price,
            photos: data.photos,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <Form onSubmit={handleSubmit}>
              <Fieldset.Root size="lg" invalid>
                <Fieldset.Legend>Edit</Fieldset.Legend>
                <Fieldset.Content>
                  <Field label="Title" invalid={errors.title && touched.title}>
                    <Input
                      name="title"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.title}
                      disabled={isSubmitting}
                    />
                  </Field>
                  <Field
                    label="Description"
                    invalid={errors.description && touched.description}
                  >
                    <Textarea
                      name="description"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.description}
                      disabled={isSubmitting}
                    />
                  </Field>
                  <Field label="Price" invalid={errors.price && touched.price}>
                    <Input
                      name="price"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.price}
                      disabled={isSubmitting}
                    />
                  </Field>
                  <FieldArray
                    name="photos"
                    render={(arrayHelpers) => (
                      <div>
                        {values.photos &&
                          values.photos.map((photo, index) => (
                            <Box key={index}>
                              <Field label={`photo ${index + 1}`} />
                              <Input
                                name={`photos.${index}`}
                                onChange={handleChange}
                                value={photo}
                                disabled={isSubmitting}
                                width="3xl"
                              />{" "}
                              <Button
                                colorPalette="red"
                                onClick={() => arrayHelpers.remove(index)}
                              >
                                Remove
                              </Button>
                            </Box>
                          ))}
                        <Button
                          mt="10px"
                          colorPalette="green"
                          type="button"
                          onClick={() => arrayHelpers.push("")}
                        >
                          Add a Photo
                        </Button>
                      </div>
                    )}
                  />
                </Fieldset.Content>
                <Button
                  mt={4}
                  width="full"
                  type="submit"
                  isLoading={isSubmitting}
                  loadingText="Saving..."
                  colorPalette={"blue"}
                >
                  Update
                </Button>
              </Fieldset.Root>
            </Form>
          )}
        </Formik>
      </Box>
    </div>
  );
}

export default ProductEditDetail;
