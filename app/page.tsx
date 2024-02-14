"use client"
import Image from "next/image"
import cardLogo from "@/public/images/card-logo.svg"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const schema = z.object({
  cardHolder: z.string().min(1, { message: "Can’t be blank" }),
  cardNumber: z
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

export default function Home() {
  const [cardNumberLabel, setCardNumberLabel] = useState("0000 0000 0000 0000")
  const [cardHolderLabel, setCardHolderLabel] = useState("JANE APPLESEED")
  const [cardExpirationMonthLabel, setCardExpirationMonthLabel] = useState("00")
  const [cardExpirationYearLabel, setCardExpirationYearLabel] = useState("00")
  const [cardCVCLabel, setCardCVCLabel] = useState("000")
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  })

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

    setCardNumberLabel(spacedNumber)
  }

  const onSubmit: SubmitHandler<Schema> = (data) => {
    console.log(data)
  }

  return (
    <main className="grid h-full max-w-[90rem] grid-cols-1 md:grid-cols-2">
      <div className="relative flex h-60 w-full items-center justify-center bg-[url('/images/bg-main-mobile.png')] bg-cover bg-no-repeat px-4 pt-8">
        <h1 className="sr-only">Interactive Card Details Form</h1>
        <div className="relative -mb-[2.66rem] min-h-[15.35rem] w-[21.375rem]">
          <div className="absolute right-0 top-0 h-[9.8125rem] w-[17.875rem] rounded-md bg-[url('/images/bg-card-back.png')] bg-contain bg-no-repeat">
            <p className="label-on-card-small absolute right-[2rem] top-[4.5rem] text-white">
              {cardCVCLabel}
            </p>
          </div>
          <div className="absolute bottom-0 left-0 h-[9.8125rem] w-[17.875rem] rounded-md bg-[url('/images/bg-card-front.png')] bg-contain bg-no-repeat p-5 text-white">
            <Image
              src={cardLogo}
              alt="Card Logo"
              className=""
              width={54}
              height={30}
            />
            <p className="mt-[2.31rem] text-lg font-medium tracking-[0.1375rem]">
              {cardNumberLabel}
            </p>
            <div className="label-on-card-small mt-3 flex uppercase">
              <p className="">{cardHolderLabel}</p>
              <p className="ml-auto">
                {cardExpirationMonthLabel} / {cardExpirationYearLabel}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="px-6 pb-[2.81rem] pt-[5.69rem]">
        <form
          className="grid grid-cols-2 gap-x-[0.69rem] gap-y-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="col-span-2">
            <Label htmlFor="cardHolder">Cardholder Name</Label>
            <Input
              id="cardHolder"
              type="text"
              placeholder="e.g. Jane Appleseed"
              {...register("cardHolder")}
              onChange={(e) => setCardHolderLabel(e.target.value)}
              className={errors.cardHolder ? "border-red" : ""}
            />
            {errors.cardHolder && (
              <p className="error-message">{errors.cardHolder.message}</p>
            )}
          </div>
          <div className="col-span-2">
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input
              id="cardNumber"
              type="text"
              placeholder="e.g. 1234 5678 9123 0000"
              {...register("cardNumber")}
              onChange={handleCardNumberChange}
              className={errors.cardNumber ? "border-red" : ""}
            />
            {errors.cardNumber && (
              <p className="error-message">{errors.cardNumber.message}</p>
            )}
          </div>
          <div className="col-span-1">
            <Label htmlFor="expirationMonth">Exp. Date (MM/YY)</Label>
            <div className="flex gap-2">
              <Input
                id="expirationMonth"
                type="text"
                placeholder="MM"
                {...register("expirationMonth")}
                onChange={(e) => setCardExpirationMonthLabel(e.target.value)}
                className={errors.expirationMonth ? "border-red" : ""}
              />
              <Input
                id="expirationYear"
                type="text"
                placeholder="YY"
                {...register("expirationYear")}
                onChange={(e) => setCardExpirationYearLabel(e.target.value)}
                className={errors.expirationYear ? "border-red" : ""}
              />
            </div>
            {errors.expirationMonth && (
              <p className="error-message">{errors.expirationMonth.message}</p>
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
              onChange={(e) => setCardCVCLabel(e.target.value)}
              className={errors.cvv ? "border-red" : ""}
            />
            {errors.cvv && (
              <p className="error-message">{errors.cvv.message}</p>
            )}
          </div>
          <Button className="col-span-2 mt-2" type="submit">
            Confirm
          </Button>
        </form>
      </div>
    </main>
  )
}
