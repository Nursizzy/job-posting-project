import {useEffect, useState} from 'react';
import {Button, Col, Form, Row, Select, Space,} from 'antd';

import {currencies, experiences, industries, locations,} from '../../shared/data';
import {FiltersType, JobFiltersProps} from "../../shared/types/seeker";


const { Option } = Select;

export const JobFilters = ({ updateFilters, currentFilters } : JobFiltersProps) => {
  const [form] = Form.useForm();
  const [isFiltersApplied, setIsFiltersApplied] = useState(false);

  useEffect(() => {
    form.setFieldsValue(currentFilters);
  }, [currentFilters, form]);

  const onFinish = (values: FiltersType) => {
    updateFilters(values);
  };

  const clearFilters = () => {
    form.resetFields();
    updateFilters({
      salary_currencyId: [],
      locationId: [],
      industryId: [],
      experienceId: [],
    });
  };

  const formValues = Form.useWatch([], form);

  useEffect(() => {
    // @ts-ignore
    const filtersApplied = Object.values(form.getFieldsValue()).some((value) => value && value.length > 0);
    setIsFiltersApplied(filtersApplied);
  }, [formValues, form]);

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Row gutter={12}>
        <Col span={24}>
          <Form.Item name="salary_currencyId" label="Currency">
            <Select mode="multiple" placeholder="Select currencies">
              {currencies.map((currency) => (
                <Option key={currency.id} value={currency.id}>
                  <Space>
                    {currency.symbol}

                    {currency.name}
                  </Space>
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item name="locationId" label="Location">
            <Select mode="multiple" placeholder="Select locations">
              {locations.map((location) => (
                <Option key={location.id} value={location.id}>
                  <Space>
                    {location.icon}

                    {location.name}
                  </Space>
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item name="industryId" label="Industry">
            <Select mode="multiple" placeholder="Select industries">
              {industries.map((industry) => (
                <Option key={industry.id} value={industry.id}>
                  <Space>
                    {industry.icon}

                    {industry.name}
                  </Space>
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item name="experienceId" label="Experience">
            <Select mode="multiple" placeholder="Select experience levels">
              {experiences.map((experience) => (
                <Option key={experience.id} value={experience.id}>
                  <Space>
                    {experience.icon}

                    {experience.name}
                  </Space>
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col span={24}>
          <Button
            type="primary"
            htmlType="submit"
            disabled={!isFiltersApplied}
            style={{ width: '100%', marginBottom: '10px' }}
          >
            Apply Filters
          </Button>
        </Col>

        <Col span={24}>
          <Button onClick={clearFilters} style={{ width: '100%' }}>
            Clear Filters
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
