import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { X, Calculator } from "lucide-react";

interface EMICalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EMICalculatorModal({ isOpen, onClose }: EMICalculatorModalProps) {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [tenure, setTenure] = useState("");
  const [emi, setEmi] = useState<number | null>(null);

  if (!isOpen) return null;

  const calculateEMI = () => {
    const P = parseFloat(loanAmount);
    const r = parseFloat(interestRate) / 12 / 100;
    const n = parseFloat(tenure) * 12;
    
    if (P && r && n) {
      const emiValue = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      setEmi(Math.round(emiValue));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold flex items-center">
            <Calculator className="w-5 h-5 mr-2" />
            EMI Calculator
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Loan Amount (₹)</label>
            <Input
              type="number"
              placeholder="Enter loan amount"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Interest Rate (% per annum)</label>
            <Input
              type="number"
              placeholder="Enter interest rate"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Tenure (Years)</label>
            <Input
              type="number"
              placeholder="Enter tenure in years"
              value={tenure}
              onChange={(e) => setTenure(e.target.value)}
            />
          </div>
          
          <Button onClick={calculateEMI} className="w-full bg-[#0056D2] hover:bg-[#0056D2]/90">
            Calculate EMI
          </Button>
          
          {emi && (
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-600">Monthly EMI</p>
              <p className="text-2xl font-bold text-green-600">₹{emi.toLocaleString()}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}