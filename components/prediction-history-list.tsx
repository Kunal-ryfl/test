'use client'

import { usePredictionHistory } from '../contexts/PredictionHistoryContext'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export function PredictionHistoryList() {
  const { history } = usePredictionHistory()

  if (history.length === 0) {
    return <p>No predictions have been made yet.</p>
  }

  return (
    <Table>
      <TableCaption>Your diabetes prediction history</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Result</TableHead>
          <TableHead>Pregnancies</TableHead>
          <TableHead>Glucose</TableHead>
          <TableHead>Blood Pressure</TableHead>
          <TableHead>Skin Thickness</TableHead>
          <TableHead>Insulin</TableHead>
          <TableHead>BMI</TableHead>
          <TableHead>DPF</TableHead>
          <TableHead>Age</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {history.map((entry) => (
          <TableRow key={entry.id}>
            <TableCell>{entry.timestamp.toLocaleString()}</TableCell>
            <TableCell>
              <Badge variant={entry.prediction ? "destructive" : "secondary"}>
                {entry.prediction ? "At Risk" : "Low Risk"}
              </Badge>
            </TableCell>
            <TableCell>{entry.metrics.pregnancies}</TableCell>
            <TableCell>{entry.metrics.glucose}</TableCell>
            <TableCell>{entry.metrics.bloodPressure}</TableCell>
            <TableCell>{entry.metrics.skinThickness}</TableCell>
            <TableCell>{entry.metrics.insulin}</TableCell>
            <TableCell>{entry.metrics.bmi}</TableCell>
            <TableCell>{entry.metrics.dpf}</TableCell>
            <TableCell>{entry.metrics.age}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

