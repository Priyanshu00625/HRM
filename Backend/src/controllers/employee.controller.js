import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Employee } from "../models/employee.model.js";

const genrateAccessTokenRefreshToken = async (employeeId) => {
  try {
    const employee = await Employee.findOne(employeeId);
    const accessToken = await employee.generateAccessToken();
    const refreshToken = await employee.generateRefreshToken();
    employee.refreshtoken = refreshToken;

    await employee.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, error.mesaage);
  }
};

export const registerEmployee = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    age,
    phoneNumber,
    gender,
    qualification,
    depName,
    jobRole,
    password,
  } = req.body;

  if (
    [
      name,
      email,
      age,
      phoneNumber,
      gender,
      qualification,
      depName,
      jobRole,
      password,
    ].some((fields) => fields.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const employeeExist = await Employee.findOne({ email });
  if (employeeExist) {
    throw new ApiError(409, "Employee All Ready Exist");
  }
  if (age < 18 || age > 45) {
    throw new ApiError(400, "You are not aligible Employee Age unmatched");
  }
  const NumberVelidation = phoneNumber.trim();

  if (NumberVelidation.length !== 10) {
    throw new ApiError(400, "invalid number");
  }

  const employee = await Employee.create({
    name,
    email,
    age,
    phoneNumber,
    gender,
    qualification,
    jobRole,
    depName,
    password,
  });
  const createEmployee = await Employee.findById(employee._id).select(
    "-password -refreshtoken",
  );

  if (!createEmployee) {
    throw new ApiError(
      500,
      "Employee not register something went wrong while registering",
    );
  }
  return res
    .status(200)
    .json(new ApiResponse(200, "employee register Successfully"));
});

export const logIn = asyncHandler(async (req, res) => {
  
  const { email, password } = req.body;
  if (!email && !password) {
    throw new ApiError(409, "All fields are required");
  }

  const employee = await Employee.findOne({ email });

  if (!employee) {
    return new ApiError(404, "employee not found");
  }
  const isPasswordValid = await employee.isPasswordCorrect(password);

  if (!isPasswordValid) {
    return new ApiError(401, "invalid credential");
  }
  const { accessToken, refreshToken } = await genrateAccessTokenRefreshToken(
    employee._id,
  );

  const logInEmployee = await Employee.findById(employee._id).select(
    "-password  -refreshtoken",
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { employee: logInEmployee, accessToken, refreshToken },
        "Employee Login SuccessFully",
      ),
    );
});

export const logout = asyncHandler(async (req, res) => {
  await Employee.findByIdAndUpdate(
    req.employee._id ,
    {
      $unset: {
        refreshtoken: 1,
      },
    },
    {
      new: true,
    },
  );
  const option = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("accessToken", option)
    .clearCookie("refreshToken", option)
    .json(new ApiResponse(200, "logout successfully"));
});
