import { Card, Input, Typography, Select, Option, Button } from "@material-tailwind/react";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form"

const SignUp = () => {
    // npm i @material-tailwind/react
    // npm install react-hook-form

    const {
        control,
        handleSubmit,
        formState: { errors },
        getValues,
        watch,
        unregister,
        reset
    } = useForm({
        mode: 'onTouched'
    });

    const domain = watch("domain");// value of domain

    // * Remove from FORM
    useEffect(() => {
        if (domain !== 'others') {
            unregister("otherdomainname");
        }
    }, [domain, unregister]);

    const onSubmit = (data) => console.log(data)


    return (
        <div className="h-screen grid place-items-center bg-gray-50">
            <Card color="transparent" shadow={false} className="border bg-[#fff] w-full max-w-[650px] p-[20px]">
                <Typography variant="h4" color="blue-gray" className="text-center">
                    Sign Up
                </Typography>
                <Typography color="gray" className="mt-1 font-normal text-center mb-[10px]">
                    Nice to meet you! Enter your details to register.
                </Typography>
                <form
                    className="mb-4 w-full grid grid-cols-1 md:grid-cols-2 gap-6"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="col-span-2 md:col-span-1">
                        <Controller
                            name="username"
                            rules={{
                                required: "User is Required",
                                minLength: {
                                    value: 6,
                                    message: "Minium 6 characters required"
                                }
                            }}
                            control={control}
                            render={({ field }) => (
                                <Input
                                    size="lg"
                                    {...field}
                                    label="Username"
                                    error={Boolean(errors?.username?.message)} />
                            )}
                        />
                        {
                            errors?.username?.message && (
                                <span className="error-text">{errors?.username?.message}</span>
                            )
                        }
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <Controller
                            name="email"
                            control={control}
                            rules={{
                                required: "Email ID is Required",
                                pattern: {
                                    value: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
                                    message: "Email ID is invalid"
                                }
                            }}
                            render={({ field }) => (
                                <Input
                                    type="email"
                                    size="lg"
                                    {...field}
                                    label="Email ID"
                                    error={Boolean(errors?.username?.message)}
                                />
                            )}
                        />
                        {
                            errors?.email?.message && (
                                <span className="error-text">{errors?.email?.message}</span>
                            )
                        }
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <Controller
                            name="domain"
                            control={control}
                            rules={{
                                required: "Domain is Required",
                            }}
                            render={({ field }) => (
                                <Select
                                    label="Select Domain"
                                    {...field}
                                    error={Boolean(errors?.domain?.message)}
                                >
                                    <Option value="designer">Designer</Option>
                                    <Option value="dev">Developer</Option>
                                    <Option value="tester">Tester</Option>
                                    <Option value="others">Others</Option>
                                </Select>
                            )}
                        />
                        {
                            errors?.domain?.message && (
                                <span className="error-text">{errors?.domain?.message}</span>
                            )
                        }
                    </div>
                    {
                        domain === 'others' && (
                            <div className="col-span-2 md:col-span-1">
                                <Controller
                                    name="otherdomainname"
                                    control={control}
                                    rules={{
                                        required: "Domain Name is Required",
                                    }}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            size="lg"
                                            label="Type Here"
                                            error={Boolean(errors?.otherdomainname?.message)}
                                        />
                                    )}
                                />
                                {
                                    errors?.otherdomainname?.message && (
                                        <span className="error-text">{errors?.otherdomainname?.message}</span>
                                    )
                                }
                            </div>
                        )
                    }
                    <div className="col-span-2 md:col-span-1">
                        <Controller
                            name="password"
                            control={control}
                            rules={{
                                required: "Password is Required",
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/,
                                    message: "Password not strong enough"
                                }
                            }}
                            render={({ field }) => (
                                <Input
                                    type="password"
                                    {...field}
                                    size="lg"
                                    label="Password"
                                    error={Boolean(errors?.password?.message)} />
                            )}
                        />
                        {
                            errors?.password?.message && (
                                <span className="error-text">{errors?.password?.message}</span>
                            )
                        }
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <Controller
                            name="confirmpassword"
                            control={control}
                            rules={{
                                required: "Confirm Password is Required",
                                validate: (value) => getValues('password') === value || "Password do not match",
                            }}
                            render={({ field }) => (
                                <Input
                                    type="password"
                                    {...field}
                                    size="lg"
                                    label="Confirm Password"
                                    error={Boolean(errors?.confirmpassword?.message)} />
                            )}
                        />
                        {
                            errors?.confirmpassword?.message && (
                                <span className="error-text">{errors?.confirmpassword?.message}</span>
                            )
                        }
                    </div>
                    <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-3">
                        <Button type="reset" variant="outlined" onClick={() => reset()}>Reset</Button>
                        <Button type="submit">Create Account</Button>
                    </div>
                </form>
            </Card>
        </div>
    )
};

export default SignUp;