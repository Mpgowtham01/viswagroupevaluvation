export interface TestMethod {
  method: string;
  parameters: string[];
  sampleType: string;
}

export interface Lab {
  id: number;
  labName: string;
  location: string;
  contactPerson: string;
  contactNumber: string;
  servicesOffered: string[];
  types: string;
  viscosity: string;
  temperature: string;
  turbidity: string;
  status: "Active" | "Inactive";
  testMethods: TestMethod[];
}
