import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter, List } from "reactstrap";

const data = [
  {id: 1, producto: "Teclado", tipoProducto: "Periferico",Stock:"Disponible",Precio:"usd"},
  {id: 2, producto: "Mouse", tipoProducto: "Periferico",Stock: "Disponible",Precio:"usd"},
  {id: 3, producto: "Monitor", tipoProducto: "Periferico", Stock: "Disponible",Precio:"usd"},
  {id: 4, producto: "Auriculares Bluetooth", tipoProducto: "Periferico",Stock: "Disponible",Precio:"usd"},
  {id: 5, producto: "Teclado Mecanico", tipoProducto: "Periferico", Stock:"Disponible",Precio:"Usd"},
  {id: 6, producto: "Microfono Logitech", tipoProducto: "Periferico", Stock:"Disponible",Precio:"Usd"},

];



class App extends React.Component{
  state={
    data: data,
    form:{
      id:'',
      Precio:'',
      producto:'',
      Stock:''
    },
    modalInsertar:false,
    modalEditar:false,
  };
  
  handleChange=e=>{
    this.setState({
      form:{
        ...this.state.form,
        [e.target.name]: e.target.value,
      }
    });
  }

  mostrarModalInsertar=()=>{
    this.setState({modalInsertar:true});
  }

  ocultarModalInsertar=()=>{
    this.setState({modalInsertar:false});
  }

  mostrarModalEditar=(registro)=>{
    this.setState({modalEditar:true,form:registro});
  }

  ocultarModalEditar=()=>{
    this.setState({modalEditar:false});
  }



  insertar=()=>{
    var valorNuevo={...this.state.form};
    valorNuevo.id=this.state.data.length+1;
    var lista=this.state.data;
    lista.push(valorNuevo);
    this.setState({data: lista, modalInsertar: false});
  }

  editar=(dato)=>{
    var contador=0;
    var lista=this.state.data;
    lista.map((registro)=>{
      if(dato.id==registro.id){
        lista[contador].producto=dato.producto;
        lista[contador].tipoProducto=dato.tipoProducto;
        lista[contador].Stock=dato.Stock;
        lista[contador].Precio=dato.Precio;
      }
      contador++;

    });
    this.setState({data:lista, modalEditar:false,});
  }

  eliminar=(dato)=>{
    var opcion=window.confirm("Estas seguro de eliminar este producto?" + dato.id);
    if(opcion){
      var contador=0;
      var lista =this.state.data;
      lista.map((registro)=>{
        if(registro.id==dato.id){
          lista.splice(contador,1);
        }
        contador++;
      });
      this.setState({data:lista});
    }
  }
  

  render(){
    return (
      <>
      <Container>
        <br />
      <Button color="info" onClick={()=>this.mostrarModalInsertar()}>Nuevo Producto</Button>
      <br/>
      <br />
      
      <Table striped bordered hover>
        <thead><tr><th>ID</th>
        <th>Producto</th>
        <th>Tipo Producto</th>
        <th>Stock</th>
        <th>Precio</th>
          </tr></thead>
        <tbody>
        {this.state.data.map((elemento)=>(
          <tr>
            <td>{elemento.id}</td>
            <td>{elemento.producto}</td>
            <td>{elemento.tipoProducto}</td>
            <td>{elemento.Stock}</td>
            <td>{elemento.Precio}</td>
            <td><Button color="success"size='sm' onClick={()=>this.mostrarModalEditar(elemento)}>Editar</Button><br/>
              {" "}<br/>
            <Button color="danger"size='sm' onClick={()=>this.eliminar(elemento)}>Eliminar</Button></td>
        
          </tr>
        ))}


        </tbody>
      </Table>

      </Container>
      <Modal isOpen={this.state.modalInsertar}>
        <ModalHeader>
          <div>
            <h3>Insertar Producto</h3>
          </div>
        </ModalHeader>
        
        <ModalBody>
          <FormGroup>
            <label>Id:</label>
            <input className='form-control'readOnly type='text' value={this.state.data.length+1}/>
          </FormGroup>
          
          <FormGroup>
            <label>Stock:</label>
            <input className='form-control' name='Stock' type='text' onChange={this.handleChange}/>
          </FormGroup>

          <FormGroup>
            <label>Producto:</label>
            <input className='form-control' name='producto' type='text' onChange={this.handleChange}/>
          </FormGroup>
          
          <FormGroup>
            <label>Precio:</label>
            <input className='form-control' name='precio' type='text' onChange={this.handleChange}/>
          </FormGroup>

          <FormGroup>
            <label>tipoProducto:</label>
            <input className='form-control'name='tipoProducto'  type='text' onChange={this.handleChange}/>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <button color='primary' onClick={()=>this.insertar()}>insertar</button>
          <button color='danger' onClick={()=>this.ocultarModalInsertar()}>cancelar</button>
        </ModalFooter>
      </Modal>
      
      
      <Modal isOpen={this.state.modalEditar}>
          <ModalHeader>
           <div><h3>Editar Producto</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup><label>Id: </label>
            <input className="form-control" readOnly type="text" value={this.state.form.id}/>
            </FormGroup>
            <FormGroup>
              <label>Producto: </label>
              <input className="form-control"name="producto" type="text" onChange={this.handleChange} value={this.state.form.producto}
              />
            </FormGroup>
            
            <FormGroup>
            <label>tipoProducto:</label>
            <input className='form-control'name='tipoProducto'  type='text' onChange={this.handleChange} value={this.state.form.tipoProducto}/>
          </FormGroup>

          <FormGroup>
            <label>Precio:</label>
            <input className='form-control'name='precio'  type='text' onChange={this.handleChange} value={this.state.form.Precio}/>
          </FormGroup>
            
            <FormGroup>
              <label> Stock: </label>
               <input className="form-control"name="stock" type="text" onChange={this.handleChange} value={this.state.form.Stock}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button color="primary"onClick={() => this.editar(this.state.form)}>
              Editar
            </Button>
            <Button className="btn btn-danger"onClick={() => this.ocultarModalEditar()}>Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      
          </>
        )}
      }

export default App;
        