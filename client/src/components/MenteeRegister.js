import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavbarLogin from "./NavbarLogin";

function MenteeRegister() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onFormSubmit = (userData) => {
    // console.log(userData)
    axios
      .post("http://localhost:3001/mentee/register", userData)
      .then((res) => {
        console.log(res);
        navigate("/dashboard-mentee");
      })
      .catch((err) => {
        console.log(err);
        navigate("/");
      });
    // console.log(userData)
  };
  return (
    <div id="reg">
      <NavbarLogin />
      <div className="container">
        <div className="row">
          <div className="col-11 col-sm-8 col-md-5 mx-auto mt-5 mb-4">
            <form
              className="border p-4 bg-secondary bg-opacity-50"
              onSubmit={handleSubmit(onFormSubmit)}
            >
              <div className="mb-3">
                <p className="display-6">Mentee Registration Form</p>
              </div>

              {/* username */}
              <div className="mb-3">
                <label htmlFor="un">
                  <em>Name</em>
                </label>
                <input
                  type="text"
                  id="un"
                  className="form-control"
                  {...register("username", {
                    required: true,
                    minLength: 4,
                    maxLength: 10,
                  })}
                />
                {/* validation error msg for username */}
                {errors.username?.type === "required" && (
                  <p className="text-danger">* Username required</p>
                )}
                {errors.username?.type === "minLength" && (
                  <p className="text-danger">* Min length should be 4</p>
                )}
                {errors.username?.type === "maxLength" && (
                  <p className="text-danger">* Max length should be 10</p>
                )}
              </div>
              {/* email */}
              <div className="mb-3">
                <label htmlFor="email">
                  <em>Email</em>
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  {...register("email", { required: true })}
                />
                {/* validation error msg for email */}
                {errors.email?.type === "required" && (
                  <p className="text-danger">* Email required</p>
                )}
              </div>

              {/* password */}
              <div className="mb-3">
                <label htmlFor="pw">
                  <em>Password</em>
                </label>
                <input
                  type="password"
                  id="pw"
                  className="form-control"
                  {...register("password", {
                    required: true,
                    minLength: 8,
                    maxLength: 16,
                  })}
                />
                {/* validation error msg for password */}
                {errors.password?.type === "required" && (
                  <p className="text-danger">* Password required</p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="text-danger">* Min length should be 8</p>
                )}
                {errors.password?.type === "maxLength" && (
                  <p className="text-danger">* Max length should be 16</p>
                )}
              </div>
              {/* confirm password */}
              <div className="mb-3">
                <label htmlFor="pw">
                  <em>Confirm Password</em>
                </label>
                <input
                  type="password"
                  id="pw"
                  className="form-control"
                  {...register("password", { required: true })}
                />
                {/* validation error msg for password */}
                {errors.password?.type === "required" && (
                  <p className="text-danger">* Confirm Password required</p>
                )}
              </div>
              {/* mobile phoneNumber */}
              <div className="mb-3">
                <label htmlFor="phoneNumber">
                  <em>Mobile Phone Number</em>
                </label>
                <input
                  type="number"
                  id="phoneNumber"
                  className="form-control"
                  {...register("phoneNumber", { required: true })}
                />
                {/* validation error msg for phoneNumber */}
                {errors.phoneNumber?.type === "required" && (
                  <p className="text-danger">* MobilePhoneNumber required</p>
                )}
              </div>
              {/* Select gender */}
              <div className="mb-3">
                <label htmlFor="gender">
                  <em>Gender</em>
                </label>
                <div>
                  <input
                    type="radio"
                    id="gender-male"
                    value="Male"
                    {...register("gender", { required: true })}
                  />
                  <label htmlFor="gender-male">Male</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="gender-female"
                    value="Female"
                    {...register("gender", { required: true })}
                  />
                  <label htmlFor="gender-female">Female</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="gender-other"
                    value="Other"
                    {...register("gender", { required: true })}
                  />
                  <label htmlFor="gender-other">Other</label>
                </div>

                {/* validation error msg for gender */}
                {errors.gender?.type === "required" && (
                  <p className="text-danger">* Gender is required</p>
                )}
              </div>
              {/* Select your age */}
              <div className="mb-3">
                <label htmlFor="ageCategory">
                  <em>Age</em>
                </label>
                <div>
                  <input
                    type="radio"
                    id="age-18-25"
                    value="18-25"
                    {...register("ageCategory", { required: true })}
                  />
                  <label htmlFor="age-18-25">18-25</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="age-26-35"
                    value="26-35"
                    {...register("ageCategory", { required: true })}
                  />
                  <label htmlFor="age-26-35">26-35</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="age-36-45"
                    value="36-45"
                    {...register("ageCategory", { required: true })}
                  />
                  <label htmlFor="age-36-45">36-45</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="age-46+"
                    value="46+"
                    {...register("ageCategory", { required: true })}
                  />
                  <label htmlFor="age-46+">46+</label>
                </div>
                {/* validation error msg for age */}
                {errors.ageCategory?.type === "required" && (
                  <p className="text-danger">* Age is required</p>
                )}
              </div>
              {/* Date of birth */}
              <div className="mb-3">
                <label htmlFor="dateOfBirth">
                  <em>Date of Birth</em>
                </label>
                <input
                  type="date"
                  id="dateOfBirth"
                  className="form-control"
                  {...register("dateOfBirth", { required: true })}
                />
                {/* validation error msg for date of birth */}
                {errors.dateOfBirth?.type === "required" && (
                  <p className="text-danger">* Date of Birth is required</p>
                )}
              </div>
              {/* Languages spoken */}
              <div className="mb-3">
                <label htmlFor="languagesSpoken">
                  <em>Languages Known</em>
                </label>
                <div>
                  <input
                    type="checkbox"
                    id="english"
                    value="English"
                    {...register("languagesSpoken", { required: true })}
                  />
                  <label htmlFor="english">English</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="hindi"
                    value="Hindi"
                    {...register("languagesSpoken", { required: true })}
                  />
                  <label htmlFor="hindi">Hindi</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="telugu"
                    value="Telugu"
                    {...register("languagesSpoken", { required: true })}
                  />
                  <label htmlFor="telugu">Telugu</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="kannada"
                    value="Kannada"
                    {...register("languagesSpoken", { required: true })}
                  />
                  <label htmlFor="kannada">Kannada</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="tamil"
                    value="Tamil"
                    {...register("languagesSpoken", { required: true })}
                  />
                  <label htmlFor="tamil">Tamil</label>
                </div>
                {/* validation error msg for languagesSpoken */}
                {errors.languagesSpoken?.type === "required" && (
                  <p className="text-danger">* Select at least one language</p>
                )}
              </div>
              {/* Select your address */}
              <div className="mb-3">
                <label htmlFor="address">
                  <em>Address</em>
                </label>
                <textarea
                  id="address"
                  className="form-control"
                  {...register("address", { required: true })}
                />
                {/* validation error msg for address */}
                {errors.address?.type === "required" && (
                  <p className="text-danger">* Address is required</p>
                )}
              </div>

              {/* Select your education status */}
              <div className="mb-3">
                <label htmlFor="educationStatus">
                  <em>Education status</em>
                </label>
                <textarea
                  id="educationStatus"
                  className="form-control"
                  {...register("educationStatus", { required: true })}
                />
                {/* validation error msg for address */}
                {errors.address?.type === "required" && (
                  <p className="text-danger">* Education status is required</p>
                )}
              </div>

              {/* Education Program */}
              <div className="mb-3">
                <label htmlFor="educationProgram">
                  <em>Education program</em>
                </label>
                <textarea
                  id="educationProgram"
                  className="form-control"
                  {...register("educationProgram", { required: true })}
                />
                {/* validation error msg for address */}
                {errors.address?.type === "required" && (
                  <p className="text-danger">* This field is required</p>
                )}
              </div>

              {/* Plans after 5 years */}
              <div className="mb-3">
                <label htmlFor="plansAfter5Years">
                  <em>Plans after 5 years</em>
                </label>
                <textarea
                  id="plansAfter5Years"
                  className="form-control"
                  {...register("plansAfter5Years", { required: true })}
                />
                {/* validation error msg for address */}
                {errors.address?.type === "required" && (
                  <p className="text-danger">* This field is required</p>
                )}
              </div>

              {/* Available days */}
              <div className="mb-3">
                <label htmlFor="availableDays">
                  <em>Available Days</em>
                </label>
                <div>
                  <input
                    type="checkbox"
                    id="monday"
                    value="Monday"
                    {...register("availableDays", { required: true })}
                  />
                  <label htmlFor="monday">Monday</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="tuesday"
                    value="Tuesday"
                    {...register("availableDays", { required: true })}
                  />
                  <label htmlFor="tuesday">Tuesday</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="wednesday"
                    value="Wednesday"
                    {...register("availableDays", { required: true })}
                  />
                  <label htmlFor="wednesday">Wednesday</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="thursday"
                    value="Thursday"
                    {...register("availableDays", { required: true })}
                  />
                  <label htmlFor="thursday">Thursday</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="friday"
                    value="Friday"
                    {...register("availableDays", { required: true })}
                  />
                  <label htmlFor="friday">Friday</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="saturday"
                    value="Saturday"
                    {...register("availableDays", { required: true })}
                  />
                  <label htmlFor="saturday">Saturday</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="sunday"
                    value="Sunday"
                    {...register("availableDays", { required: true })}
                  />
                  <label htmlFor="sunday">Sunday</label>
                </div>
                {/* validation error msg for availableDays */}
                {errors.availableDays?.type === "required" && (
                  <p className="text-danger">
                    * At least one day must be selected
                  </p>
                )}
              </div>

              {/* Available timing slots */}
              <div className="mb-3">
                <label htmlFor="availableTimingSlots">
                  <em>Available Timing Slots</em>
                </label>
                <div>
                  <input
                    type="checkbox"
                    id="timing-9-11"
                    value="9-11"
                    {...register("availableTimingSlots", { required: true })}
                  />
                  <label htmlFor="timing-9-11">9-11</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="timing-11-1"
                    value="11-1"
                    {...register("availableTimingSlots", { required: true })}
                  />
                  <label htmlFor="timing-11-1">11-1</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="timing-1-3"
                    value="1-3"
                    {...register("availableTimingSlots", { required: true })}
                  />
                  <label htmlFor="timing-1-3">1-3</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="timing-3-5"
                    value="3-5"
                    {...register("availableTimingSlots", { required: true })}
                  />
                  <label htmlFor="timing-3-5">3-5</label>
                </div>
                {/* validation error msg for availableTimingSlots */}
                {errors.availableTimingSlots?.type === "required" && (
                  <p className="text-danger">
                    * Select at least one timing slot
                  </p>
                )}
              </div>

              {/* Other comments */}
              <div className="mb-3">
                <label htmlFor="otherComments">
                  <em>Other comments</em>
                </label>
                <textarea
                  id="otherComments"
                  className="form-control"
                  {...register("otherComments", { required: true })}
                />
                {/* validation error msg for address */}
                {errors.address?.type === "required" && (
                  <p className="text-danger">* This field is required</p>
                )}
              </div>

              {/* Module chosen
              <div className="mb-3">
                <label htmlFor="moduleChosen">
                  <em>Module Chosen</em>
                </label>
                <div>
                  <input
                    type="checkbox"
                    id="dataScience"
                    value="Data Science Module"
                    {...register("moduleChosen", { required: true })}
                  />
                  <label htmlFor="dataScience">Data Science Module</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="communication"
                    value="Communication Module"
                    {...register("moduleChosen", { required: true })}
                  />
                  <label htmlFor="communication">Communication Module</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="digitalMarketing"
                    value="Digital Marketing Module"
                    {...register("moduleChosen", { required: true })}
                  />
                  <label htmlFor="digitalMarketing">
                    Digital Marketing Module
                  </label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="businessAnalytics"
                    value="Business Analytics Module"
                    {...register("moduleChosen", { required: true })}
                  />
                  <label htmlFor="businessAnalytics">
                    Business Analytics Module
                  </label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="cloudComputing"
                    value="Cloud Computing Module"
                    {...register("moduleChosen", { required: true })}
                  />
                  <label htmlFor="cloudComputing">Cloud Computing Module</label>
                </div>
                {errors.moduleChosen?.type === "required" && (
                  <p className="text-danger">* Select at least one module</p>
                )}
              </div> */}
              {/* terms and conditions */}
              <div className="mb-4">
                <div className="form-check">
                  <input
                    type="checkbox"
                    id="front-end"
                    className="form-check-input"
                    {...register("skills")}
                    value="front-end"
                  />
                  <label htmlFor="front-end" className="form-check-label">
                    <em>
                      I accept all the <a href="#">Terms and conditions</a>
                    </em>
                  </label>
                </div>
              </div>
              {/* submit button */}
              <div className="mb-0 text-center">
                <button type="submit" className="btn btn-success w-50 mb-1">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenteeRegister;
