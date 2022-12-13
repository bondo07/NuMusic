import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Card, Col, CardGroup } from "react-bootstrap";
import './ResultsTable.css'



const ResultsTable = ({result, setArtistInfo}) => {
    let navigate = useNavigate();

    function handleSelection(e) {
        e.preventDefault();
        navigate("../searchresults", {replace: true});
        setArtistInfo(result);
    }
    return ( 
        <div className="artist-card" onClick={handleSelection}>
            <CardGroup>
                <Card style={{ width: '18rem' }} border="success">
                    <Card.Img variant="top" src={result.artistImg} />
                    <Card.Body>
                        <Card.Title>
                            {result.name}
                        </Card.Title>
                    </Card.Body>
                </Card>
            </CardGroup>
        </div>
     );
}
 
export default ResultsTable;