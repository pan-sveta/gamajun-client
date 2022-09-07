import React, {useEffect, useRef} from 'react';

import BpmnJS from 'gamajun-bpmn-js/dist/gamajun-modeler.bundled';
//const BpmnJS = dynamic(() => import("gamajun-bpmn-js/dist/gamajun-modeler.bundled"));

//BPMN-js css
import "bpmn-js/dist/assets/diagram-js.css"
import "bpmn-js/dist/assets/bpmn-font/css/bpmn.css"
import dynamic from "next/dynamic";


export default function BpmnModeler({url, diagramXML}) {


    const container = useRef<HTMLDivElement>(null);

    const bpmnViewer = new BpmnJS({container});

    this.bpmnViewer.on('import.done', (event) => {
        const {
            error,
            warnings
        } = event;

        if (error) {
            return this.handleError(error);
        }

        this.bpmnViewer.get('canvas').zoom('fit-viewport');

        return this.handleShown(warnings);
    });

    if (url) {
        return this.fetchDiagram(url);
    }

    if (diagramXML) {
        return this.displayDiagram(diagramXML);
    }


    useEffect(() => {
        this.bpmnViewer.destroy();
        return () => {
            // Your code here
        }
    }, [yourDependency]);

    useEffect(() => {
        const {
            props,
            state
        } = this;

        if (props.url !== prevProps.url) {
            return this.fetchDiagram(props.url);
        }

        const currentXML = props.diagramXML || state.diagramXML;

        const previousXML = prevProps.diagramXML || prevState.diagramXML;

        if (currentXML && currentXML !== previousXML) {
            return this.displayDiagram(currentXML);
        }
    }, [props, state]);

    function displayDiagram(diagramXML) {
        this.bpmnViewer.importXML(diagramXML);
    }

    function fetchDiagram(url) {

        this.handleLoading();

        fetch(url)
            .then(response => response.text())
            .then(text => this.setState({diagramXML: text}))
            .catch(err => this.handleError(err));
    }

    function handleLoading() {
        const {onLoading} = this.props;

        if (onLoading) {
            onLoading();
        }
    }

    function handleError(err) {
        const {onError} = this.props;

        if (onError) {
            onError(err);
        }
    }

    function handleShown(warnings) {
        const {onShown} = this.props;

        if (onShown) {
            onShown(warnings);
        }
    }


    return (
        <div className="react-bpmn-diagram-container" style={{height: "50vh"}} ref={container}></div>
    );

}