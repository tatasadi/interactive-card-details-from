"use client"
import Image from "next/image"
import cardLogo from "@/public/images/card-logo.svg"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export default function Home() {
  const [cardNumberLabel, setCardNumberLabel] = useState("0000 0000 0000 0000")
  const [cardHolderLabel, setCardHolderLabel] = useState("JANE APPLESEED")
  const [cardExpirationLabel, setCardExpirationLabel] = useState("00/00")
  const [cardCVCLabel, setCardCVCLabel] = useState("000")

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
              <p className="ml-auto">{cardExpirationLabel}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="px-6 pb-[2.81rem] pt-[5.69rem]">
        <form className="grid grid-cols-2 gap-x-[0.69rem] gap-y-5">
          <div className="col-span-2">
            <Label htmlFor="cardHolder">Cardholder Name</Label>
            <Input
              id="cardHolder"
              type="text"
              placeholder="e.g. Jane Appleseed"
            />
          </div>
          <div className="col-span-2">
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input
              id="cardNumber"
              type="text"
              placeholder="e.g. 1234 5678 9123 0000"
            />
          </div>
          <div className="col-span-1">
            <Label htmlFor="expirationMonth">Exp. Date (MM/YY)</Label>
            <div className="flex gap-2">
              <Input id="expirationMonth" type="text" placeholder="MM" />
              <Input id="expirationYear" type="text" placeholder="YY" />
            </div>
          </div>
          <div className="col-span-1">
            <Label htmlFor="cvv">CVV</Label>
            <Input id="cvv" type="text" placeholder="e.g. 123" />
          </div>
          <Button className="col-span-2 mt-2">Confirm</Button>
        </form>
      </div>
    </main>
  )
}
