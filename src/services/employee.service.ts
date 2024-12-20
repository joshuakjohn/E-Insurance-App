

class EmployeeService{
    refreshToken(employeeId: string) {
        throw new Error("Method not implemented.");
    }
    resetPassword(body: any, adminId: any) {
        throw new Error("Method not implemented.");
    }
    forgotPassword(email: any) {
        throw new Error("Method not implemented.");
    }
    createEmployee(body: any) {
        throw new Error("Method not implemented.");
    }
    loginEmployee(body: any): { token: any; refreshToken: any; username: any; email: any; } | PromiseLike<{ token: any; refreshToken: any; username: any; email: any; }> {
        throw new Error("Method not implemented.");
    }

}

export default EmployeeService;