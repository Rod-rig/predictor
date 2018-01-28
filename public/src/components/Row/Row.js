import React from 'react';

const Row = (props) => {
    return (
        <tr>
            <td>{props.row.position}</td>
            <td>{props.row.teamName}</td>
            <td>{props.row.matches}</td>
            <td>{props.row.w}</td>
            <td>{props.row.d}</td>
            <td>{props.row.l}</td>
            <td>{props.row.goals}</td>
            <td>{props.row.points}</td>
        </tr>
    );
};

export default Row;
