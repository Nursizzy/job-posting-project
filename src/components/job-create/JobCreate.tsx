import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button, Col, Form, Input, InputNumber, notification, Row, Select, Space, Tooltip,
} from 'antd';
import { useForm } from 'antd/es/form/Form';

import {currencies, experiences, industries, locations} from '../../shared/data';
import { publishJobPosting, saveJobPostingAsDraft } from '../../shared/requests/firebase-requests';
import {JobCreateProps} from "../../shared/types/recruiter";
import {PostingType} from "../../shared/types/seeker";

export const JobCreate = ({ initialData } : JobCreateProps) => {
  const [form] = useForm();
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const onFormSubmit = async () => {
    try {
      const values = await form.validateFields();
      const result = await publishJobPosting(values, initialData as PostingType);
      notification.success({ message: `Job posting ${result} successfully` });
      if (!initialData) form.resetFields();
      navigate('/job-listing-recruiter');
    } catch (error) {
      notification.error({ message: 'Error while publishing job posting' });
    }
  };

  const onSaveAsDraft = async () => {
    try {
      const values = await form.getFieldsValue();
      const result = await saveJobPostingAsDraft(values, initialData as PostingType);
      notification.success({ message: `Job posting ${result} as draft` });
      if (!initialData) form.resetFields();
      navigate('/job-listing-recruiter');
    } catch (error) {
      notification.error({ message: 'Error while saving job posting as draft' });
    }
  };

  const renderButtons = () => {
    const buttonStyle = isMobile ? { width: '100%', marginBottom: '10px' } : { width: '300px' };

    if (!initialData) {
      return (
        <Space size={4}>
          <Button type="default" onClick={onSaveAsDraft} style={buttonStyle}>
            Save as Draft
          </Button>

          <Button type="primary" onClick={onFormSubmit} style={buttonStyle}>
            Post Job
          </Button>
        </Space>
      );
    } if (initialData.status === 'draft') {
      return (
        <Button type="primary" onClick={onFormSubmit} style={buttonStyle}>
          Post Job
        </Button>
      );
    } if (initialData.status === 'posted') {
      return (
        <Tooltip title="To edit you have to revert to Draft">
          <Button type="default" onClick={onSaveAsDraft} style={buttonStyle}>
            Revert to Draft
          </Button>
        </Tooltip>
      );
    }
  };

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24}>
        <Form
          form={form}
          layout="vertical"
          initialValues={initialData as PostingType}
          disabled={initialData?.status === 'posted'}
        >
          <Row gutter={[16, 16]}>
            <Col
              xs={24}
              sm={12}
              md={8}
              lg={6}
            >
              <Form.Item
                name="title"
                label="Job Title"
                rules={[{ required: true, message: 'Please enter a job title' }]}
              >
                <Input placeholder="Enter job title..." />
              </Form.Item>
            </Col>

            <Col
              xs={24}
              sm={12}
              md={8}
              lg={6}
            >
              <Form.Item
                name="salary_currencyId"
                label="Salary Currency"
                rules={[{ required: true, message: 'Please select a currency' }]}
              >
                <Select placeholder="Select currency">
                  {currencies.map((currency) => (
                    <Select.Option key={currency.id} value={currency.id}>
                      {currency.name} {currency.symbol}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col
              xs={24}
              sm={12}
              md={8}
              lg={6}
            >
              <Form.Item
                name="locationId"
                label="Location"
                rules={[{ required: true, message: 'Please select a location' }]}
              >
                <Select placeholder="Select location">
                  {locations.map((location) => (
                    <Select.Option key={location.id} value={location.id}>
                      <Space>
                        {location.icon}

                        {location.name}
                      </Space>
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col
              xs={24}
              sm={12}
              md={8}
              lg={6}
            >
              <Form.Item
                name="industryId"
                label="Industry"
                rules={[{ required: true, message: 'Please select an industry' }]}
              >
                <Select placeholder="Select industry">
                  {industries.map((industry) => (
                    <Select.Option key={industry.id} value={industry.id}>
                      <Space>
                        {industry.icon}

                        {industry.name}
                      </Space>
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col
                xs={24}
                sm={12}
                md={8}
                lg={6}
            >
              <Form.Item
                  name="experienceId"
                  label="Experience Level"
                  rules={[{ required: true, message: 'Please select an experience level' }]}
              >
                <Select placeholder="Select Experience">
                  {experiences.map((experience) => (
                      <Select.Option key={experience.id} value={experience.id}>
                        <Space>
                          {experience.icon}

                          {experience.name}
                        </Space>
                      </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col
              xs={24}
              sm={12}
              md={8}
              lg={6}
            >
              <Form.Item
                name={['salary_range', 'from']}
                label="Salary From"
                rules={[{ required: true, message: 'Please enter a salary amount' }]}
              >
                <InputNumber addonBefore="From" placeholder="Enter salary amount..." style={{ width: '100%' }} />
              </Form.Item>
            </Col>

            <Col
              xs={24}
              sm={12}
              md={8}
              lg={6}
            >
              <Form.Item
                name={['salary_range', 'to']}
                label="Salary To"
                rules={[{ required: true, message: 'Please enter a salary amount' }]}
              >
                <InputNumber addonBefore="To" placeholder="Enter salary amount..." style={{ width: '100%' }} />
              </Form.Item>
            </Col>

            <Col xs={24}>
              <Form.Item
                name="description"
                label="Job Description"
                rules={[{ required: true, message: 'Please enter a job description' }]}
              >
                <Input.TextArea
                  autoSize={{ minRows: 3, maxRows: 20 }}
                  placeholder="Enter job description..."
                  showCount
                  maxLength={5000}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Col>

      <Col xs={24}>
        <Row justify="end" gutter={[16, 16]}>
          <Col>{renderButtons()}</Col>
        </Row>
      </Col>
    </Row>
  );
};
