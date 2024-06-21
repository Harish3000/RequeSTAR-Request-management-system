import React from "react";
import { Modal, Form, Input, DatePicker, Select } from "antd";
import axios from "axios";

const { Option } = Select;

interface RequestFormProps {
  visible: boolean;
  onCancel: () => void;
  onFormSubmit: () => void;
}

const RequestForm: React.FC<RequestFormProps> = ({
  visible,
  onCancel,
  onFormSubmit,
}) => {
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    try {
      const response = await axios.post("/api/requests", values);
      console.log("Form submitted successfully:", response.data);
      form.resetFields();
      onCancel();
      onFormSubmit();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Modal
      title="Add Request"
      visible={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          name="requestId"
          label="Request ID"
          rules={[{ required: true, message: "Please enter request ID" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="createdOn"
          label="Created On"
          rules={[{ required: true, message: "Please select created date" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          name="location"
          label="Location"
          rules={[{ required: true, message: "Please enter location" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="service"
          label="Service"
          rules={[{ required: true, message: "Please enter service" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="status"
          label="Status"
          rules={[{ required: true, message: "Please select status" }]}
        >
          <Select>
            <Option value="NEW">New</Option>
            <Option value="IN_PROGRESS">In Progress</Option>
            <Option value="ON_HOLD">On Hold</Option>
            <Option value="REJECTED">Rejected</Option>
            <Option value="CANCELLED">Cancelled</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="priority"
          label="Priority"
          rules={[{ required: true, message: "Please select priority" }]}
        >
          <Select>
            <Option value="HIGH">High</Option>
            <Option value="MEDIUM">Medium</Option>
            <Option value="LOW">Low</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="department"
          label="Department"
          rules={[{ required: true, message: "Please enter department" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="requestedBy"
          label="Requested By"
          rules={[{ required: true, message: "Please enter requester name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="assignedTo"
          label="Assigned To"
          rules={[{ required: true, message: "Please enter assignee name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <button
            type="submit"
            className="bg-[#830823] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RequestForm;
