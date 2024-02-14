"use client"
import Image from "next/image"
import cardLogo from "@/public/images/card-logo.svg"
import iconComplete from "@/public/images/icon-complete.svg"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const schema = z.object({
  holder: z.string().min(1, { message: "Can’t be blank" }),
  number: z
    .string()
    .min(1, { message: "Can’t be blank" })
    .regex(/^\d{4}\d{4}\d{4}\d{4}$/, {
      message: "Wrong format, numbers only",
    }),
  expirationMonth: z
    .string()
    .min(1, { message: "Can’t be blank" })
    .regex(/^(0[1-9]|1[0-2])$/, {
      message: "Wrong format",
    }),
  expirationYear: z
    .string()
    .min(1, { message: "Can’t be blank" })
    .regex(/^\d{2}$/, {
      message: "Wrong format",
    }),
  cvv: z
    .string()
    .min(1, { message: "Can’t be blank" })
    .regex(/^\d{3}$/, {
      message: "Wrong format",
    }),
})

type Schema = z.infer<typeof schema>

const initialLabels = {
  number: "0000 0000 0000 0000",
  holder: "JANE APPLESEED",
  expirationMonth: "00",
  expirationYear: "00",
  cvv: "000",
}

const initialValues = {
  holder: "",
  number: "",
  expirationMonth: "",
  expirationYear: "",
  cvv: "",
}

export default function Home() {
  const [labels, setLabels] = useState(initialLabels)
  const [showForm, setShowForm] = useState(true)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  })

  useEffect(() => {
    reset(initialValues)
  }, [isSubmitSuccessful, reset])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLabels((prevLabels) => ({
      ...prevLabels,
      [e.target.name]: e.target.value,
    }))
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputVal = e.target.value.replace(/ /g, "") //remove all the empty spaces in the input

    if (inputVal.length > 16) {
      //If entered value has a length greater than 16 then take only the first 16 digits
      inputVal = inputVal.substr(0, 16)
    }

    // Get nd array of 4 digits per an element EX: ["4242", "4242", ...]
    const splits = inputVal.match(/.{1,4}/g)

    let spacedNumber = ""
    if (splits) {
      spacedNumber = splits.join(" ") // Join all the splits with an empty space
    }

    setLabels((prevLabels) => ({ ...prevLabels, number: spacedNumber }))
  }

  const onSubmit: SubmitHandler<Schema> = (data) => {
    setShowForm(false)
  }

  const handleReset = () => {
    setLabels(initialLabels)
    setShowForm(true)
  }

  return (
    <main className="grid h-full max-w-[90rem] grid-cols-1 xl:min-h-[56.25rem] xl:grid-cols-2">
      <div className="relative flex h-60 w-full items-center justify-center bg-[url('/images/bg-main-mobile.png')] bg-cover bg-center bg-no-repeat px-4 pt-8 xl:block xl:h-full xl:w-[30.1875rem] xl:p-0">
        <h1 className="sr-only">Interactive Card Details Form</h1>
        <div className="relative -mb-[2.66rem] min-h-[15.35rem] w-[21.375rem] xl:left-[10.25rem] xl:top-[11.75rem] xl:mb-0 xl:h-[32.9375rem] xl:min-h-0 xl:w-[33.8125rem]">
          <div className="absolute right-0 top-0 h-[9.8125rem] w-[17.875rem] rounded-md bg-[url('/images/bg-card-back.png')] bg-contain bg-no-repeat shadow-xl xl:bottom-0 xl:top-auto xl:h-[15.3125rem] xl:w-[27.9375rem]">
            <p className="label-on-card-small absolute right-[2rem] top-[4.5rem] text-white xl:right-[3.56rem] xl:top-[6.80rem]">
              {labels.cvv}
            </p>
          </div>
          <div className="absolute bottom-0 left-0 h-[9.8125rem] w-[17.875rem] rounded-md bg-[url('/images/bg-card-front.png')] bg-contain bg-no-repeat p-5 text-white shadow-xl xl:bottom-auto xl:top-0 xl:h-[15.3125rem] xl:w-[27.9375rem] xl:py-7 xl:pl-8">
            <div className="h-[1.875rem] w-[3.375rem] xl:h-[2.9375rem] xl:w-[5.25rem]">
              <Image
                src={cardLogo}
                alt="Card Logo"
                className=""
                width={84}
                height={47}
              />
            </div>
            <p className="mt-[2.31rem] text-lg font-medium tracking-[0.1375rem] xl:mt-16 xl:text-[1.75rem] xl:tracking-[0.21388rem]">
              {labels.number}
            </p>
            <div className="label-on-card-small mt-3 flex uppercase xl:mt-8">
              <p className="">{labels.holder}</p>
              <p className="ml-auto mr-4">
                {labels.expirationMonth}/{labels.expirationYear}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="place-self-center px-6 pb-[2.81rem] pt-[5.69rem] xl:pl-28 xl:pr-[14.19rem] xl:pt-10">
        {showForm ? (
          <form
            className="grid grid-cols-2 gap-x-[0.69rem] gap-y-5 xl:gap-x-5 xl:gap-y-[1.35rem]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="col-span-2">
              <Label htmlFor="holder">Cardholder Name</Label>
              <Input
                id="holder"
                type="text"
                placeholder="e.g. Jane Appleseed"
                {...register("holder")}
                onChange={handleChange}
                className={errors.holder ? "border-red" : ""}
              />
              {errors.holder && (
                <p className="error-message">{errors.holder.message}</p>
              )}
            </div>
            <div className="col-span-2">
              <Label htmlFor="number">Card Number</Label>
              <Input
                id="number"
                type="text"
                placeholder="e.g. 1234 5678 9123 0000"
                {...register("number")}
                onChange={handleCardNumberChange}
                className={errors.number ? "border-red" : ""}
              />
              {errors.number && (
                <p className="error-message">{errors.number.message}</p>
              )}
            </div>
            <div className="col-span-1">
              <Label htmlFor="expirationMonth">Exp. Date (MM/YY)</Label>
              <div className="flex gap-2 xl:gap-[0.63rem]">
                <Input
                  id="expirationMonth"
                  type="text"
                  placeholder="MM"
                  {...register("expirationMonth")}
                  onChange={handleChange}
                  className={errors.expirationMonth ? "border-red" : ""}
                />
                <Input
                  id="expirationYear"
                  type="text"
                  placeholder="YY"
                  {...register("expirationYear")}
                  onChange={handleChange}
                  className={errors.expirationYear ? "border-red" : ""}
                />
              </div>
              {errors.expirationMonth && (
                <p className="error-message">
                  {errors.expirationMonth.message}
                </p>
              )}
              {!errors.expirationMonth && errors.expirationYear && (
                <p className="error-message">{errors.expirationYear.message}</p>
              )}
            </div>
            <div className="col-span-1">
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                type="text"
                placeholder="e.g. 123"
                {...register("cvv")}
                onChange={handleChange}
                className={errors.cvv ? "border-red" : ""}
              />
              {errors.cvv && (
                <p className="error-message">{errors.cvv.message}</p>
              )}
            </div>
            <Button className="col-span-2 mt-2 xl:mt-[1.2rem]" type="submit">
              Confirm
            </Button>
          </form>
        ) : (
          <div className="flex w-full flex-col items-center font-medium xl:min-w-[23.8125rem]">
            <Image src={iconComplete} alt="Icon Complete" />
            <h2 className="text-very-dark-violet mt-[2.19rem] text-[1.75rem] uppercase leading-normal tracking-[0.21388rem]">
              Thank you!
            </h2>
            <p className="text-dark-grayish-violet mt-4 text-lg">
              We’ve added your card details
            </p>
            <Button className="mt-12 w-full" onClick={handleReset}>
              Continue
            </Button>
          </div>
        )}
      </div>
    </main>
  )
}
