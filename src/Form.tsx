import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Lab } from "./Types";

interface DynamicFormProps {
  defaultValues?: Lab;
  onSubmit: (data: Lab) => void;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ defaultValues, onSubmit }) => {
  const {
    control,
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors },
  } = useForm<Lab>({
    defaultValues: defaultValues || {
      id: 0,
      labName: "",
      location: "",
      contactPerson: "",
      contactNumber: "",
      servicesOffered: [],
      status: "Active",
      testMethods: [],
    },
  });

  const watchSampleType = watch("testMethods", []).map((test) => test.sampleType || "");

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
        reset();
      })}
    >
      <div>
        <label>Lab Name:</label>
        <input {...register("labName", { required: "Lab name is required" })} />
        {errors.labName && <p>{errors.labName.message as string}</p>}
      </div>

      <div>
        <label>Location:</label>
        <input {...register("location", { required: "Location is required" })} />
        {errors.location && <p>{errors.location.message as string}</p>}
      </div>

      <div>
        <label>Contact Person:</label>
        <input {...register("contactPerson", { required: "Contact person is required" })} />
        {errors.contactPerson && <p>{errors.contactPerson.message as string}</p>}
      </div>

      <div>
        <label>Contact Number:</label>
        <input {...register("contactNumber", { required: "Contact number is required" })} />
        {errors.contactNumber && <p>{errors.contactNumber.message as string}</p>}
      </div>

      <div>
        <label>Services Offered:</label>
        <Controller
          name="servicesOffered"
          control={control}
          render={({ field }) => (
            <select {...field} multiple>
              <option value="Chemical Analysis">Chemical Analysis</option>
              <option value="Oil Testing">Oil Testing</option>
              <option value="Water Quality">Water Quality</option>
              <option value="Material Testing">Material Testing</option>
            </select>
          )}
        />
      </div>

      <div>
        <label>Status:</label>
        <select {...register("status")}>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      {/* Test Methods Dynamic Fields */}
      <div>
        <label>Test Methods:</label>
        {watchSampleType.map((sampleType, index) => (
          <div key={index}>
            <label>Method:</label>
            <input {...register(`testMethods.${index}.method` as const)} />

            <label>Parameters:</label>
            <input {...register(`testMethods.${index}.parameters` as const)} />

            <label>Sample Type:</label>
            <select {...register(`testMethods.${index}.sampleType` as const)}>
              <option value="Oil">Oil</option>
              <option value="Water">Water</option>
              <option value="Metal">Metal</option>
              <option value="Air">Air</option>
            </select>
          </div>
        ))}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default DynamicForm;
