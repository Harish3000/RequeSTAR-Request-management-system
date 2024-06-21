import React, { useEffect, useState } from "react";
import {
  Table,
  Tag,
  Modal,
  Button,
  Form,
  Input,
  notification,
  Select,
  DatePicker,
} from "antd";
import { EyeOutlined, DeleteOutlined, FilterOutlined } from "@ant-design/icons";
import axios from "axios";
import moment, { Moment } from "moment";

const { Option } = Select;
const { RangePicker } = DatePicker;

interface RequestTableProps {
  data: any[];
  onDataUpdate: () => void;
  updateCounts: () => void;
}

const columns = (showModal: (record: any) => void) => [
  {
    title: "Request ID",
    dataIndex: "requestId",
    key: "requestId",
  },
  {
    title: "Created On",
    dataIndex: "createdOn",
    key: "createdOn",
  },
  {
    title: "Location",
    dataIndex: "location",
    key: "location",
  },
  {
    title: "Service",
    dataIndex: "service",
    key: "service",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status: string) => (
      <Tag
        color={
          status === "NEW"
            ? "blue"
            : status === "IN_PROGRESS"
              ? "red"
              : status === "ON_HOLD"
                ? "gray"
                : "orange"
        }
      >
        {status}
      </Tag>
    ),
  },
  {
    title: "Department",
    dataIndex: "department",
    key: "department",
  },
  {
    title: "Requested By",
    dataIndex: "requestedBy",
    key: "requestedBy",
  },
  {
    title: "Assigned To",
    dataIndex: "assignedTo",
    key: "assignedTo",
  },
  {
    title: "Priority",
    dataIndex: "priority",
    key: "priority",
    render: (priority: string) => (
      <Tag
        color={
          priority === "HIGH"
            ? "red"
            : priority === "MEDIUM"
              ? "yellow"
              : "green"
        }
      >
        {priority}
      </Tag>
    ),
  },
  {
    title: "Actions",
    key: "actions",
    render: (_: any, record: any) => (
      <EyeOutlined onClick={() => showModal(record)} />
    ),
  },
];

const RequestTable: React.FC<RequestTableProps> = ({
  data,
  onDataUpdate,
  updateCounts,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<any>(null);
  const [filteredData, setFilteredData] = useState(data);
  const [form] = Form.useForm();

  const [searchText, setSearchText] = useState("");
  const [selectedDate, setSelectedDate] = useState<Moment | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    null
  );
  const [departmentOptions, setDepartmentOptions] = useState<string[]>([]);

  useEffect(() => {
    setIsModalVisible(false);
  }, [data]);

  useEffect(() => {
    let filtered = data;

    if (searchText) {
      filtered = filtered.filter((item) =>
        Object.values(item).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(searchText.toLowerCase())
        )
      );
    }

    if (selectedDate) {
      filtered = filtered.filter((item) =>
        moment(item.createdOn).isSame(selectedDate, "day")
      );
    }

    if (selectedStatus) {
      filtered = filtered.filter((item) => item.status === selectedStatus);
    }

    if (selectedDepartment) {
      filtered = filtered.filter(
        (item) => item.department === selectedDepartment
      );
    }

    setFilteredData(filtered);
  }, [searchText, selectedDate, selectedStatus, selectedDepartment, data]);

  useEffect(() => {
    const departments = new Set<string>();
    data.forEach((item) => {
      departments.add(item.department);
    });
    setDepartmentOptions(Array.from(departments));
  }, [data]);

  const showModal = (record: any) => {
    setCurrentRecord(record);
    setIsModalVisible(true);
    form.setFieldsValue(record);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentRecord(null);
  };

  const handleUpdate = async (values: any) => {
    try {
      await axios.patch(`/api/requests/${currentRecord._id}`, values);
      notification.success({
        message: "Update Successful",
        description: "The request has been updated successfully.",
      });
      onDataUpdate();
      updateCounts();
    } catch (error) {
      notification.error({
        message: "Update Failed",
        description: "There was an error updating the request.",
      });
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/requests/${currentRecord._id}`);
      notification.success({
        message: "Delete Successful",
        description: "The request has been deleted successfully.",
      });
      onDataUpdate();
      updateCounts();
    } catch (error) {
      notification.error({
        message: "Delete Failed",
        description: "There was an error deleting the request.",
      });
    }
  };

  const confirmDelete = () => {
    Modal.confirm({
      title: "Are you sure you want to delete this request?",
      onOk: handleDelete,
    });
  };

  const clearFilters = () => {
    setSearchText("");
    setSelectedDate(null);
    setSelectedStatus(null);
    setSelectedDepartment(null);
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex flex-wrap items-center mb-4 space-y-2 sm:space-y-0 sm:space-x-2">
        <Input
          placeholder="Search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full sm:w-auto"
        />
        <DatePicker
          onChange={(date) =>
            setSelectedDate(date ? moment(date.valueOf()) : null)
          }
          className="w-full sm:w-auto"
        />
        <Select
          placeholder="Filter by Status"
          onChange={(value) => setSelectedStatus(value)}
          value={selectedStatus}
          allowClear
          className="w-full sm:w-auto"
        >
          <Option value="NEW">NEW</Option>
          <Option value="IN_PROGRESS">IN_PROGRESS</Option>
          <Option value="ON_HOLD">ON_HOLD</Option>
          <Option value="REJECTED">REJECTED</Option>
          <Option value="CANCELLED">CANCELLED</Option>
        </Select>
        <Select
          placeholder="Filter by Department"
          onChange={(value) => setSelectedDepartment(value)}
          value={selectedDepartment}
          allowClear
          className="w-full sm:w-auto"
        >
          {departmentOptions.map((department) => (
            <Option key={department} value={department}>
              {department}
            </Option>
          ))}
        </Select>
        <Button
          type="primary"
          onClick={clearFilters}
          icon={<FilterOutlined />}
          className="w-full sm:w-auto"
          style={{
            backgroundColor: "#830823",
            borderColor: "#830823",
            color: "white",
          }}
        >
          Clear Filters
        </Button>
      </div>
      <Table
        columns={columns(showModal)}
        dataSource={filteredData}
        rowKey="_id"
        scroll={{ x: true }}
      />
      <Modal
        title="Request Details"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button
            key="delete"
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={confirmDelete}
            style={{ float: "left" }}
          >
            Delete
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => form.submit()}
            style={{ backgroundColor: "#830823", borderColor: "#830823" }}
          >
            Update
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical" onFinish={handleUpdate}>
          <Form.Item label="Request ID" name="requestId">
            <Input disabled />
          </Form.Item>
          <Form.Item label="Created On" name="createdOn">
            <Input disabled />
          </Form.Item>
          <Form.Item label="Location" name="location">
            <Input />
          </Form.Item>
          <Form.Item label="Service" name="service">
            <Input />
          </Form.Item>
          <Form.Item label="Status" name="status">
            <Select>
              <Option value="NEW">NEW</Option>
              <Option value="IN_PROGRESS">IN_PROGRESS</Option>
              <Option value="ON_HOLD">ON_HOLD</Option>
              <Option value="REJECTED">REJECTED</Option>
              <Option value="CANCELLED">CANCELLED</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Department" name="department">
            <Input />
          </Form.Item>
          <Form.Item label="Requested By" name="requestedBy">
            <Input />
          </Form.Item>
          <Form.Item label="Assigned To" name="assignedTo">
            <Input />
          </Form.Item>
          <Form.Item label="Priority" name="priority">
            <Select>
              <Option value="HIGH">HIGH</Option>
              <Option value="MEDIUM">MEDIUM</Option>
              <Option value="LOW">LOW</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default RequestTable;
