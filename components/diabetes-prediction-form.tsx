'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Activity, AlertCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useState } from "react"
import { usePredictionHistory } from '../contexts/PredictionHistoryContext'

const formSchema = z.object({
  pregnancies: z.string().transform(Number).pipe(
    z.number().min(0).max(20)
  ),
  glucose: z.string().transform(Number).pipe(
    z.number().min(0).max(500)
  ),
  bloodPressure: z.string().transform(Number).pipe(
    z.number().min(0).max(300)
  ),
  skinThickness: z.string().transform(Number).pipe(
    z.number().min(0).max(100)
  ),
  insulin: z.string().transform(Number).pipe(
    z.number().min(0).max(1000)
  ),
  bmi: z.string().transform(Number).pipe(
    z.number().min(0).max(100)
  ),
  dpf: z.string().transform(Number).pipe(
    z.number().min(0).max(3)
  ),
  age: z.string().transform(Number).pipe(
    z.number().min(0).max(120)
  ),
})

export default function DiabetesPredictionForm() {
  const { addPrediction } = usePredictionHistory()
  const [prediction, setPrediction] = useState<null | boolean>(null)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pregnancies: "",
      glucose: "",
      bloodPressure: "",
      skinThickness: "",
      insulin: "",
      bmi: "",
      dpf: "",
      age: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    try {
      // Simulated prediction
      await new Promise(resolve => setTimeout(resolve, 1000))
      const predictionResult = Math.random() > 0.5
      setPrediction(predictionResult)
      
      // Add to history
      addPrediction({
        prediction: predictionResult,
        metrics: values,
      })
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Health Metrics</CardTitle>
        <CardDescription>
          Please enter your health information accurately for the best prediction results.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="pregnancies"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pregnancies</FormLabel>
                    <FormControl>
                      <Input placeholder="Number of pregnancies" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="glucose"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Glucose Level</FormLabel>
                    <FormControl>
                      <Input placeholder="mg/dL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bloodPressure"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Blood Pressure</FormLabel>
                    <FormControl>
                      <Input placeholder="mm Hg" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="skinThickness"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Skin Thickness</FormLabel>
                    <FormControl>
                      <Input placeholder="mm" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="insulin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Insulin Level</FormLabel>
                    <FormControl>
                      <Input placeholder="mu U/ml" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bmi"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>BMI</FormLabel>
                    <FormControl>
                      <Input placeholder="kg/m²" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dpf"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Diabetes Pedigree Function</FormLabel>
                    <FormControl>
                      <Input placeholder="DPF value" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input placeholder="Years" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Activity className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                "Predict Diabetes Risk"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      {prediction !== null && (
        <CardFooter>
          <Alert variant={prediction ? "destructive" : "default"}>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Prediction Result</AlertTitle>
            <AlertDescription>
              {prediction
                ? "Based on the provided metrics, you may be at risk for diabetes. Please consult with a healthcare professional for proper medical advice."
                : "Based on the provided metrics, you appear to have a lower risk for diabetes. However, please maintain a healthy lifestyle and consult with healthcare professionals regularly."}
            </AlertDescription>
          </Alert>
        </CardFooter>
      )}
    </Card>
  )
}

