import React from "react";
import { Button, Card, Col, Input, Row, Typography } from "antd";
import { useNavigate } from "react-router-dom";
//////////////////////////////////////////
import MainLayout from "../layouts/MainLayout";


const { Paragraph, Text } = Typography;

const Blogs = () => {
  const navigate = useNavigate();
  return (
    <MainLayout>
      <Row className="bg-white min-h-screen">
        <Col span={18} className="p-5 flex flex-col ">
          <Input placeholder="Busca un tema..." className="w-5/12" />
          <div className="p-5 flex flex-wrap">
            <Card title="Card title" className="w-64 m-2" loading={false}>
              <Paragraph
                ellipsis={{
                  rows: 3,
                }}
                title="lorem ipsun lorem ipsun lorem lorem lorem ipsun lorem ipsun
                lorem lorem lorem ipsun lorem ipsun lorem lorem lorem ipsun
                lorem ipsun lorem lorem"
              >
                lorem ipsun lorem ipsun lorem lorem lorem ipsun lorem ipsun
                lorem lorem lorem ipsun lorem ipsun lorem lorem lorem ipsun
                lorem ipsun lorem lorem
              </Paragraph>
            </Card>
            <Card title="Card title" className="w-64 m-2" loading={false}>
              <Paragraph
                ellipsis={{
                  rows: 3,
                }}
                title="lorem ipsun lorem ipsun lorem lorem lorem ipsun lorem ipsun
                lorem lorem lorem ipsun lorem ipsun lorem lorem lorem ipsun
                lorem ipsun lorem lorem"
              >
                lorem ipsun lorem ipsun lorem lorem lorem ipsun lorem ipsun
                lorem lorem lorem ipsun lorem ipsun lorem lorem lorem ipsun
                lorem ipsun lorem lorem
              </Paragraph>
            </Card>
          </div>
        </Col>
        <Col span={6} className="p-5 border-slate-300 border-l-2">
          <Typography.Title className="m-2" level={4} >
            Crea tu propio articulo
          </Typography.Title>
          <Text>
            Quieres expresar alguna idea tuya y que los demas la lean, crea un
            articulo de cualquier area que te guste haz click aqui
          </Text>
          <Button className="m-2" onClick={()=>{navigate('/blogForm')}}>Crear articulo</Button>
        </Col>
      </Row>
    </MainLayout>
  );
};

export default Blogs;
