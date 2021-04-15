import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';

export class TaskItem extends React.Component{

    fileComponent(fileUrl){
        if(fileUrl.includes(".pdf")){
            return (
                    <a  href={fileUrl} target="_blank" rel="noopener noreferrer" download>
                        
                        <FontAwesomeIcon icon={faFilePdf} />
                    </a>);
        }
        return (<img src={fileUrl} alt="Todo File" />);
    }

    render(){
        return(
            <tr>
                <td>{this.props.description}</td>
                <td>{this.props.dueDate}</td>
                <td>{this.props.status}</td>
                <td>{this.props.responsible}</td>
                <td>{this.props.email}</td>
                <td>{this.props.fileUrl ? this.fileComponent(this.props.fileUrl) : <div/>}</td>
            </tr>
        );
    }
}