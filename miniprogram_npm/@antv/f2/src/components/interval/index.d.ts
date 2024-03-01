import withInterval from './withInterval';
import IntervalView from './view/intervalView';
export { withInterval, IntervalView };
declare const _default: {
    new (props: import("../geometry/interface").GeometryProps, context?: any): {
        getDefaultCfg(): {
            geomType: string;
            justifyContent: boolean;
            startOnZero: boolean;
        };
        getDefaultSize(): number;
        mapping(): any[];
        getPointY0(): any;
        render(): import("../..").JSX.Element;
        isGeometry: boolean;
        geomType: import("../geometry/interface").GeomType;
        attrs: any;
        adjust: import("../geometry").AdjustProp;
        dataArray: any;
        records: any[];
        mappedArray: any;
        justifyContent: boolean;
        startOnZero: boolean;
        connectNulls: boolean;
        sortable: boolean;
        attrController: import("../../controller/attr").default;
        animation: import("../../canvas/animation/interface").AnimationCycle;
        willReceiveProps(nextProps: any): void;
        willMount(): void;
        willUpdate(): void;
        didMount(): void;
        _createAttrs(): void;
        _getThemeAttrsRange(): {
            x: import("../../coord/types").Range;
            y: import("../../coord/types").Range;
            color: any;
            size: any;
            shape: any;
        };
        _adjustScales(): void;
        _groupData(data: any): any[];
        _saveOrigin(originData: any): any[];
        _numberic(data: any): void;
        _adjustData(records: any): any;
        _updateStackRange(field: any, scale: any, dataArray: any): void;
        _processData(): void;
        _sortData(records: any): void;
        _initEvent(): void;
        getY0Value(): any;
        _getShapeStyle(shape: any, origin: any): any;
        _mapping(records: any): any;
        getClip(): {
            type: string;
            attrs: {
                x: number;
                y: number;
                width: number;
                height: number;
            };
        };
        getAttr(attrName: string): any;
        getXScale(): import("@antv/scale").Scale;
        getYScale(): import("@antv/scale").Scale;
        _getXSnap(invertPointX: any): any;
        _getYSnapRecords(invertPointY: any, records: any): any;
        flatRecords(): any;
        getSnapRecords(point: any, inCoordRange?: any): any[];
        getRecords(data: any, field?: string): any[];
        getLegendItems(): any;
        isSelected(record: any): boolean;
        getSelectionStyle(record: any): import("../../types").ShapeAttrs;
        props: import("../geometry/interface").GeometryProps;
        state: import("../geometry/selection").SelectionState;
        context: import("../../base/component").ComponentContext;
        refs: {
            [key: string]: import("../../base/component").default<any, any>;
        };
        updater: import("../../base/component").Updater<import("../geometry/selection").SelectionState>;
        children: import("../..").JSX.Element;
        container: any;
        animate: boolean;
        destroyed: boolean;
        didUpdate(): void;
        didUnmount(): void;
        setState(partialState: import("../geometry/selection").SelectionState, callback?: () => void): void;
        forceUpdate(callback?: () => void): void;
        setAnimate(animate: boolean): void;
        destroy(): void;
    };
};
export default _default;
