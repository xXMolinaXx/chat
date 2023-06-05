import {
  Button,
  Col,
  Form,
  Input,
  notification,
  Radio,
  Row,
  Select,
  Typography,
} from "antd";
import React, { useState } from "react";
///////////////////////
import MainLayout from "../layouts/MainLayout";
//////////////////////////asdsd 
///////////commit 2
/// otro commit
///
const { TextArea } = Input;

const BlogForm = () => {
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [categories, setcategories] = useState([]);
  const [typeOfPrivacy, settypeOfPrivacy] = useState("publico");
  const [article, setarticle] = useState("");
  const publishArticle = () => {
    if (title === "") {
      return notification.info({ message: "debes colocar un titulo" });
    }
    if (description === "")
      return notification.info({
        message: "debes agregar una descripcion breve",
      });
    if (categories.length === 0)
      return notification.info({
        message: "debes selecionar al menos una categoria",
      });
    if (article === "")
      return notification.info({
        message: "el articulo no puede esatr vacio",
      });
      alert('articulo guardado')
  };
  const options = [];
  for (let i = 10; i < 36; i++) {
    options.push({
      label: i.toString(36) + i,
      value: i.toString(36) + i,
    });
  }

  return (
    <MainLayout>
      <Row justify="center">
        <Col   lg={10} className="p-5 bg-white ">
          <Form
            name="Article"
            onFinish={publishArticle}
            autoComplete="off"
          >
            <Typography.Title className="m-2" level={4}>
              Crea tu propio articulo
            </Typography.Title>
            <Form.Item
              name="titleArticle"
              rules={[
                {
                  required: true,
                  message:
                    "el campo no puede contener menos de 20 caracteres y maximo 50 caracteres",
                  min: 20,
                  max: 50,
                },
              ]}
            >
              <Input
                placeholder="Titulo"
                value={title}
                onChange={({ target }) => {
                  settitle(target.value);
                }}
              />
            </Form.Item>
            <Form.Item
              name="descriptionArticle"
              rules={[
                {
                  required: true,
                  message:
                    "el campo no puede contener menos de 50 caracteres y maximo 50 caracteres",
                  min: 50,
                  max: 100,
                },
              ]}
            >
              <Input
                className="my-2"
                placeholder="Descripcion breve"
                value={description}
                onChange={({ target }) => {
                  setdescription(target.value);
                }}
              />
            </Form.Item>
            <Form.Item
              name="categories"
              rules={[
                {
                  required: true,
                  message: "ocupa escoger almenos una categoria",
                },
              ]}
            >
              <Select
                className="my-2 w-full"
                mode="multiple"
                allowClear
                placeholder="escoge las categorias"
                value={categories}
                onChange={(value) => {
                  setcategories(value);
                }}
                options={options}
              />
            </Form.Item>
            <Form.Item
              name="type"
              label="Privacidad"
              rules={[
                { required: true, message: "ocupa escoger la privacidad" },
              ]}
            >
              <Radio.Group
                className="my-2"
                value={typeOfPrivacy}
                onChange={(e) => {
                  settypeOfPrivacy(e.target.value);
                }}
              >
                <Radio value="privado">Privado</Radio>
                <Radio value="publico">Publico</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              name="article"
              rules={[
                {
                  required: true,
                  message: "el campo no puede contener menos de 150 caracteres",
                  min: 150,
                },
              ]}
            >
              <TextArea
                className="my-2"
                placeholder="escribe el articulo aqui, puede usar html y estilos en linea para mas personalizacion"
                rows={4}
                value={article}
                onChange={(e) => {
                  setarticle(e.target.value);
                }}
              />
            </Form.Item>
            <Button htmlType="submit">Publicar articulo</Button>
          </Form>
        </Col>
      </Row>
    </MainLayout>
  );
};

export default BlogForm;
