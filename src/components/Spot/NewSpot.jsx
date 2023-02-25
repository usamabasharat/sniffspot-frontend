import { useContext, useState } from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { createSpot, fetchSpots, updateSpot } from "api/spots";
import { SpotContext } from "contexts/SpotContext";

const ACCEPTED_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const NewSpot = () => {
  const { id } = useParams();
  const { currentSpot, setSpots } = useContext(SpotContext);
  const navigate = useNavigate();
  const [isEditing] = useState(
    !!(currentSpot && currentSpot.id.toString() === id)
  );
  const initialValues = {
    title: isEditing ? currentSpot.title : "",
    description: isEditing ? currentSpot.description : "",
    price: isEditing ? currentSpot.price : "",
    ...(isEditing ? {} : { images: [] }),
  };

  const handleFormSubmit = async (values, helpers) => {
    let response;
    const { setSubmitting } = helpers;

    if (!isEditing) {
      const formData = new FormData();

      formData.append("spot[title]", values.title);
      formData.append("spot[description]", values.description);
      formData.append("spot[price]", values.price);

      for (let i = 0; i < values.images.length; i++) {
        formData.append("spot[images][]", values.images[i]);
      }

      response = await createSpot(formData);
    } else {
      response = await updateSpot(currentSpot.id, { spot: values });
    }

    if (response.success) {
      const updatedSpots = await fetchSpots();
      setSpots(updatedSpots);
      navigate("/");
    }

    setSubmitting(false);
  };

  return (
    <div>
      <h1>{`${isEditing ? "Edit" : "Create"}`} a Spot</h1>

      <div className="container">
        <Formik initialValues={initialValues} onSubmit={handleFormSubmit}>
          {({ isSubmitting, setFieldValue }) => (
            <Form>
              <label htmlFor="title">Title</label>
              <Field name="title" className="form-control mb-3" required />

              <label htmlFor="description">Description</label>
              <Field
                name="description"
                as="textarea"
                className="form-control mb-3"
              />

              <label htmlFor="price">Price</label>
              <Field
                name="price"
                type="number"
                className="form-control mb-3"
                required
              />

              {!isEditing ? (
                <div>
                  <label htmlFor="images">Add images:</label>
                  <input
                    type="file"
                    name="images"
                    id="images"
                    multiple
                    accept={ACCEPTED_TYPES.join(",")}
                    onChange={(e) => setFieldValue("images", e.target.files)}
                  />
                </div>
              ) : null}

              <div className="mt-3">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  Submit
                </button>

                <button
                  type="button"
                  className="btn btn-light border ms-2"
                  onClick={() => navigate("/")}
                >
                  Cancel
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
