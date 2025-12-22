import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { OTPService } from "./otp.service";

const verifyResetOtp = catchAsync(async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  const resetToken = await OTPService.verifyResetOtp(email, otp);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "OTP verified successfully",
    data: {
      resetToken,
    },
  });
});
export const OTPController = {
    verifyResetOtp
};
