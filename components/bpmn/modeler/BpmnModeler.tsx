import React, {Dispatch, SetStateAction, useEffect, useRef, useState} from 'react';

// @ts-ignore
import BpmnJS from 'gamajun-bpmn-js/dist/gamajun-modeler.bundled';
//const BpmnJS = dynamic(() => import("gamajun-bpmn-js/dist/gamajun-modeler.bundled"));

//BPMN-js css
import "bpmn-js/dist/assets/diagram-js.css"
import "bpmn-js/dist/assets/bpmn-font/css/bpmn.css"
import dynamic from "next/dynamic";

interface BpmnModelerProps {
    url?: string,
    xml?: string,
    onXmlChange(newXml:string):void,
    onLoading?: () => void,
    onShown?: (warnings: string) => void,
    onError?: (err: string) => void,
}

interface BpmnModelerState {
    url?: string,
    xml?: string
}


export default class BpmnModeler extends React.Component<BpmnModelerProps,BpmnModelerState> {
    state: BpmnModelerState = {};
    private readonly containerRef: React.RefObject<any>;
    private bpmnViewer: any;
    private eventBus : any;

    constructor(props: BpmnModelerProps) {
        super(props);

        this.containerRef = React.createRef();
    }

    componentDidMount() {
        const container = this.containerRef.current;

        this.bpmnViewer = new BpmnJS({container});
        this.eventBus = this.bpmnViewer.get("eventBus");

        this.eventBus.on('commandStack.changed', async () => {
            let result = await this.bpmnViewer._moddle.toXML(
                this.bpmnViewer._definitions,
                {format: true}
            );

            this.setState({xml: result.xml})
            this.handleXmlChange(result.xml);
        });

        this.bpmnViewer.on('import.done', (event: any) => {
            const {error, warnings} = event;

            if (error) {
                return this.handleError(error);
            }

            this.bpmnViewer.get('canvas').zoom('fit-viewport');

            return this.handleShown(warnings);
        });

        if (this.props.url) {
            return this.fetchDiagram(this.props.url);
        }
        else if (!this.props.xml) {
            return this.fetchDiagram("/newDiagram.bpmn");
        }

        //Fix this if somehow
        if (this.state.xml)
            return this.displayDiagram(this.state.xml);
    }

    componentWillUnmount() {
        this.bpmnViewer.destroy();
    }

    componentDidUpdate(prevProps: Readonly<BpmnModelerProps>, prevState: Readonly<BpmnModelerState>) {
        const {props, state} = this;

        if (props.url && props.url !== prevProps.url) {
            return this.fetchDiagram(props.url);
        }

        const currentXML = props.xml || state.xml;

        const previousXML = prevProps.xml || prevState.xml;

        if (currentXML && currentXML !== previousXML) {
            return this.displayDiagram(currentXML);
        }
    }

    displayDiagram(diagramXML: string) {
        this.bpmnViewer.importXML(diagramXML);
    }

    fetchDiagram(url: string) {
        this.handleLoading();

        fetch(url)
            .then(response => response.text())
            .then(newXml => {
                this.setState({xml: newXml});
                this.handleXmlChange(newXml);
            })
            .catch(err => this.handleError(err));
    }

    handleLoading() {
        const {onLoading} = this.props;

        if (onLoading) {
            onLoading();
        }
    }

    handleError(err: string) {
        const {onError} = this.props;

        if (onError) {
            onError(err);
        }
    }

    handleShown(warnings: string) {
        const {onShown} = this.props;

        if (onShown) {
            onShown(warnings);
        }
    }

    handleXmlChange(newXml: string) {
        const {onXmlChange} = this.props;

        if (onXmlChange) {
            onXmlChange(newXml);
        }
    }

    render() {
        return (
            <div>
                <div className="react-bpmn-diagram-container" style={{height: "65vh"}} ref={this.containerRef}></div>
            </div>
        );
    }
}