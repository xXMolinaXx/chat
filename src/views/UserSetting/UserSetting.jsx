import {
  Alert,
  Button,
  Col,
  DatePicker,
  Input,
  notification,
  Progress,
  Row,
  Space,
  Spin,
  Typography,
} from "antd";
import React, { useCallback, useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
//////////////////////
//////////
//////////////////////
import MainLayout from "../layouts/MainLayout";
import { my_fetch } from "../../utils/fetch";
import { useNavigate, useParams } from "react-router-dom";
import noImage from "../../extras/img/user.png";
import { UserContext } from "../../hooks/userContext";
import { storage } from "../../App";
dayjs.extend(customParseFormat);
const dateFormat = "YYYY/MM/DD";
const { Title } = Typography;

const UserSetting = () => {
  let { id } = useParams();
  let navigate = useNavigate();

  const { setUserLogged } = useContext(UserContext);
  const [loading, setloading] = useState(false);
  const [seterrorMessageRegistry] = useState("");
  const [user, setuser] = useState({
    name: "",
    lastName: "",
    userName: "",
    description: "",
    password: "",
    birthday: null,
  });
  const [images, setimages] = useState([]);
  const [urlImage, seturlImage] = useState(noImage);
  const [progress, setprogress] = useState(0);
  const handleUpdate = async () => {
    setloading(true);
    let message = "";
    if (user.name === "") message += "no ingresastes tu nombre. ";
    if (user.lastName === "") message += "no ingresastes ninguna contrasena. ";
    if (message !== "") {
      setloading(false);
      seterrorMessageRegistry(message);
      return;
    }
    const answer = await my_fetch.my_fetch_put(
      `${process.env.REACT_APP_API_URL}/users/${id}`,
      user
    );
    setloading(false);
    notification.info({ message: answer.message });
    return;
  };
  const handleDelete = async () => {
    setloading(true);
    const answer = await my_fetch.my_fetch_delete(
      `${process.env.REACT_APP_API_URL}/users/${id}`
    );
    setloading(false);
    if (answer.statusCode === 401) {
      notification.info({ message: answer.message });
      return;
    }
    setUserLogged({});
    notification.info({ message: answer.message });
    navigate("/");
    return;
  };
  const changeInput = async (e) => {
    try {
      const file = e.currentTarget.files[0];
      let url = URL.createObjectURL(file);
      seturlImage(url);
      const storageRef = ref(storage, `images/${user._id}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        async (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setprogress(progress.toFixed(2));
          
          // eslint-disable-next-line default-case
          switch (snapshot.state) {
            case "paused":
              notification.info({
                message:'se ha pausado la carga de la imagen'
              })
              console.log("Upload is paused");
              break;
          }
        },
        (error) => {
          notification.info({
            message:'error al subir la imagen'
          })
        },
        async () => {
          setprogress(0);
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            my_fetch.my_fetch_post(
              `${process.env.REACT_APP_API_URL}/users/update/uploadImage`,
              {
                urlImage:downloadURL
              }
            ).then(data=>console.log(data)).catch(error=>console.log(error));
          });
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  const getUser = useCallback(async () => {
    const answer = await my_fetch.my_fetch_get(
      `${process.env.REACT_APP_API_URL}/users/${id}`
    );
    setuser(answer);
  }, [id]);

  useEffect(() => {
    getUser();
    return () => {};
  }, [getUser]);

  return (
    <MainLayout>
      <div className=" p-10 bg-white  drop-shadow-2xl">
        <Row gutter={16}>
          <Col
            className="gutter-row flex flex-col justify-center"
            xs={24}
            md={12}
          >
            <div className="my-container centerHorizontal pt-5">
              <img
                src={urlImage}
                alt="icono de chat"
                height={150}
                width={150}
                className="border-black border-4 rounded-full object-cover w-[200px] h-[200px]"
              />
            </div>
            <div className="my-container centerHorizontal py-5">
              <label className=" rounded-sm p-2 hover:border hover:bg-cyan-100 rounded-full">
                <span>Actualizar imagen</span>
                <input hidden type="file" onChange={changeInput} />
              </label>
            </div>
            {progress > 0 && (
              <div className="my-container centerHorizontal py-1">
                <Progress percent={progress} />
              </div>
            )}

            {images.map((imagen) => (
              <div className="bg-black" key={imagen.index}>
                <div className="content_img">
                  <img
                    alt="algo"
                    src={imagen.url}
                    data-toggle="modal"
                    data-target="#ModalPreViewImg"
                    className="img-responsive"
                  ></img>
                </div>
              </div>
            ))}
            <Title level={2}>codigo de usuario: {user._id}</Title>
            <p>
              nota: comparte este codigo para que tus amigos te puedan agregar
            </p>
            {/* <div className="mr-auto ml-auto">
              <Avatar size={100} icon={<UserOutlined />} />
            </div>
            <Input
              value={user.userName}
              className="rounded-md my-5 h-14"
              disabled
            />
            <Input.TextArea
              value={user.description}
              className="rounded-md my-5 h-14"
              disabled
            /> */}
          </Col>
          <Col className="gutter-row" xs={24} md={12}>
            <>
              <Title>Actualiza tu informacion!</Title>

              <Input
                className="rounded-md my-5 h-14"
                placeholder="Escribe tu nombre"
                value={user.name}
                onChange={({ target }) => {
                  setuser((user) => ({ ...user, name: target.value }));
                }}
              />
              <Input
                className="rounded-md my-5 h-14"
                placeholder="Escribe tu apellido"
                value={user.lastName}
                onChange={({ target }) => {
                  setuser((user) => ({ ...user, lastName: target.value }));
                }}
              />
              <DatePicker
                placeholder="fecha de nacimiento"
                className="w-full mb-5"
                defaultValue={dayjs("2015/01/01", dateFormat)}
                onChange={(date, stringDate) => {
                  setuser({ ...user, birthday: stringDate });
                }}
              />
              <Input
                value={user.userName}
                className="rounded-md my-5 h-14"
                placeholder="Escribe tu apodo"
                onChange={({ target }) => {
                  setuser((user) => ({ ...user, userName: target.value }));
                }}
              />
              <Input.TextArea
                value={user.description}
                onChange={({ target }) => {
                  setuser((user) => ({
                    ...user,
                    description: target.value,
                  }));
                }}
                className="rounded-md my-5 h-14"
                placeholder="descripcion breve"
              />
              <Space direction="vertical" style={{ width: "100%" }}>
                {seterrorMessageRegistry && (
                  <Alert message={"asd"} type="error" />
                )}
                <Row gutter={48} className="centerHorizontal">
                  <Col className="gutter-row">
                    <Spin spinning={loading}>
                      <Button className="bg-white" onClick={handleUpdate}>
                        Actualizar
                      </Button>
                    </Spin>
                  </Col>
                  <Col className="gutter-row">
                    <Spin spinning={loading}>
                      <Button className="bg-white" onClick={handleDelete}>
                        Eliminar Usuario
                      </Button>
                    </Spin>
                  </Col>
                </Row>
              </Space>
            </>
          </Col>
        </Row>
      </div>
    </MainLayout>
  );
};

export default UserSetting;
