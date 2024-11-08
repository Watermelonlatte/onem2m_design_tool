export const resourceType = {
    Mixed: 0,
    ACP: 1,
    AE: 2,
    CNT: 3,
    CIN: 4,
    CSE: 5,
    CSR: 16,
    SUB: 23,
    GRP: 9
};


export const resourceAttributes = {

    5: { // CSE

        rn: {
            type: "text", 
            fullName: "Resource Name",
            description: "The name of the resource",
            required:false, 
            disable: false, 
            value: ''
        }, 

        lbl: {
            type: "Array", 
            fullName: "Label",
            description: "The label of the resource. Seperate with ,(comma)",
            required:false, 
            disable: false,
            value: []
        }, 

        csi: {
            type: "text", 
            fullName: "CSE ID",
            description: "The CSE ID of the resource",
            required:true, 
            disable: false, 
            value: ''
        }, 

        csz: {
            type: "Checkbox",
            fullName: "content Serialization",
            description: "The content serialization of the resource. At lease one should be selected",
            options:{ 1: "application/json", 2: "application/cbor", 3: "application/xml"},
            required:false,
            disable: false,
            value: [1],
            validation: (value) => {
                if((value).length >= 1)
                    return true;
                return false;
            }
        },

        poa : {
            type: "Array",
            fullName: "Point of Access",
            description: "The Point of Access of the resource",
            required:false,
            disable: false,
            value: []
        },

        srt : {
            type: "Checkbox",
            fullName: "Supported Resource Type",
            description: "The supported resource type of the resource",
            options: Object.fromEntries(Object.entries(resourceType).filter((key, value) => {return value != 0}).map(([key, value]) => {return [value, key]}) ),
            required:false,
            disable: false,
            value: []
        },

        cst: {
            type: "Select", 
            fullName: "CSE Type",
            description: "The CSE Type of the resource",
            options:{1: 'IN', 2: 'MN', 3: 'ASN'}, 
            required:true, 
            disable: false, 
            value: 1
        },  

        acpi: {
            type: "Array", 
            fullName: "Access Control Policy IDs",
            description: "Set AccessControlPolicy ID to the resource",
            required:false, 
            disable: false, 
            value: []
        },

        ty: {
            type: "Number", 
            fullName: "Resource Type",
            description: "The resource type of the resource",
            required:true, 
            disable: true, 
            value: 5
        },
    },


    1:{ // ACP
        'rn': {
            type: "text", 
            fullName: "Resource Name",
            description: "The name of the resource",
            required:false, 
            disable: false, 
            value: ''
        },
        'lbl': {
            type: "Array", 
            fullName: "Label",
            description: "The label of the resource",
            required:false, 
            disable: false, 
            value: [],
            raw_value: ''
        },
        // 'cr': {
        //     type: "Boolean", 
        //     fullName: "Creator",
        //     description: "Choose whether add creator attribute to the resource",
        //     required:false, 
        //     disable: false, 
        //     value: false
        // },
        'pv': {
            type: "ACR", 
            fullName: "Privileges",
            description: "The privilege setting of the resource using this AccessControlPolicy",
            required:true, 
            disable: false, 
            value: []
        },
        'pvs': {
            type: "ACR", 
            fullName: "Self-Privileges",
            description: "The privilege setting for this AccessControlPolicy resource",
            required:true, 
            disable: false, 
            value: []
        },
        'ty': {
            type: "Number", 
            fullName: "Resource Type",
            description: "The resource type of the resource",
            required:true, 
            disable: true, 
            value: 1
        },
    },


    2: { // AE

        /*'aei': {
            type : "text",
            fullName : "AE-ID",
            description : "The AE-ID of the resource",
            placeholder : "Should Start with C or S",
            required: false,
            disable: false,
            value: '',
            validation : function(value) {
                // 'C' 또는 'S'로 시작하는 경우에만 true를 반환합니다.
                if (value[0] == 'C' || value[0] == 'S') return true;
                return false;
            }
        },
        */   
        
    


        'rn': {
            type: "text", 
            fullName: "Resource Name",
            description: "The name of the resource",
            required:false, 
            disable: false, 
            value: ''
        },

        'api': {
            type: "text",
            fullName: "App-ID",
            description: "The App-ID of the resource",
            placeholder: 'Should Start with N',
            required:false, 
            disable: false, 
            value: '',
            validation: function(value) { if(value[0] != 'N') return false; return true }
        },

       /*'aei': {
            type : "text",
            fullName : "AE-ID",
            description : "The AE-ID of the resource",
            required: true,
            disable: false,
            value: '',
            
        },  
        // -> 이부분 AE attribute 제목 옆에 originator로 설정하게 만들기 
        */

        'apn': {
            type: "text", 
            fullName: "App-Name",
            description: "The App-Name of the resource",
            required:false, 
            disable: false, 
            value: ''
        },

        'at': {
            type: "Array", 
            fullName: "announceTo",
            description: "Set cse to announce this resource. Can be CSE-ID or URL",
            required:false, 
            disable: false, 
            value: [],
            validation: (value) => {
                if(value[0] == '/') return true;
                if(value.substring(0, 7) == 'http://') return true;
                if(value.substring(0, 7) == 'mqtt://') return true;
                if(value.substring(0, 7) == 'coap://') return true;
                return false;
            }
        },
        'aa': {
            type: "Array", 
            fullName: "Announced Attribute",
            description: "Attributes to announce",
            required:false, 
            disable: false, 
            value: [],
            validation: (value) => {
                if(Object.keys(resourceAttributes[resourceType.AE]).indexOf(value) >= 0) return true;
                return false;
            }
        },
        'ast':{
            type: "Select",
            fullName: "Announce Sync Type",
            description: "Set announce sync type",
            options: {
                1: 'UNI DIRECTIONAL',
                2: 'BI DIRECTIONAL'
            },
            required:false,
            disable: false,
            value: 0
        },
        'lbl': {
            type: "Array", 
            fullName: "Label",
            description: "The label of the resource",
            required:false, 
            disable: false, 
            value: [],
            raw_value: ''
        },
        'acpi': {
            type: "Array", 
            fullName: "Access Control Policy IDs",
            description: "Resource ID or path of ACP resource to control access to this resource",
            required:false, 
            disable: false, 
            value: [],
            raw_value: ''
        },
        'rr': {
            type: "Boolean", 
            fullName: "Request Reachability",
            description: "Set whether the resource is reachable or not",
            required:false, 
            disable: false, 
            value: false
        },
        'srv': {
            type: "Checkbox", 
            fullName: "Supported Release Version",
            description: "Set supported Release Version",
            options:['1', '2', '2a', '3', '4', '5'], 
            required:true, 
            disable: false, 
            value: ['2a','3']
        },
        'poa': {
            type: "Array", 
            fullName: "Point of Access",
            description: "Set Point of Access",
            required:false, 
            disable: false, 
            value: [],  
            raw_value: ''},
        'ty': {
            type: "Number", 
            fullName: "Resource Type",
            description: "The resource type of the resource",
            required:true, 
            disable: true, 
            value: 2
        },
    },

    
    3: {
        'rn': {
            type: "text", 
            fullName: "Resource Name",
            description: "The name of the resource",
            required:false, 
            disable: false, 
            value: ''
        },
        'lbl': {
            type: "Array", 
            fullName: "Label",
            description: "The label of the resource",
            required:false, 
            disable: false, 
            value: []
        },
        'acpi': {
            type: "Array", 
            fullName: "Access Control Policy IDs",
            description: "Resource ID or path of ACP resource to control access to this resource",
            required:false, 
            disable: false, 
            value: []
        },
        'at': {
            type: "Array", 
            fullName: "announceTo",
            description: "Set cse to announce this resource. Can be CSE-ID or URL",
            required:false, 
            disable: false, 
            placeholder:'/CSE1 | http:// | mqtt:// | coap://', 
            value: [],
            validation: function (value) { 
                if(value[0] == '/') return true;
                if(value.substring(0, 7) == 'http://') return true;
                if(value.substring(0, 7) == 'mqtt://') return true;
                if(value.substring(0, 7) == 'coap://') return true;
                return false;
            }
        },
        'aa': {
            type: "Array", 
            fullName: "Announced Attribute",
            description: "Attributes to announce",
            required:false,
            disable: false, 
            value: [],
            validation: function (value) { 
                if(Object.keys(resourceAttributes[resourceType.CNT]).indexOf(value) >= 0) return true;
                return false;
            }
        },
        'ast':{
            type: "Select",
            fullName: "Announce Sync Type",
            description: "Set announce sync type",
            options: {
                1: 'UNI DIRECTIONAL',
                2: 'BI DIRECTIONAL'
            },
            required:false,
            disable: false,
            value: 0
        },
        'cr': {
            type: "Boolean", 
            fullName: "Creator",
            description: "Choose whether add creator attribute to the resource",
            required:false, 
            disable: false, 
            value: false
        },
        'mni': {
            type: "Number", 
            fullName: "Max Nr of Instances",
            description: "The maximum number of instances of the resource",
            required:false, 
            disable: false, 
            value: 0,
            validation: function (value) { 
                if(value < 0) return false;
                return true;
            }
        },
        'mbs': {
            type: "Number", 
            fullName: "Max Byte Size",
            description: "The maximum byte size of the resource",
            required:false, 
            disable: false, 
            value: 0,
            validation: function (value) { 
                if(value < 0) return false;
                return true;
            }
        },
        'mia': {
            type: "Number", 
            fullName: "Max Instance Age",
            description: "The maximum instance age of the resource",
            required:false, 
            disable: false, 
            value: 0,
            validation: function (value) { 
                if(value < 0) return false;
                return true;
            }
        },
        'ty': {
            type: "Number", 
            fullName: "Resource Type",
            description: "The resource type of the resource",
            required:true, 
            disable: true, 
            value: 3
        },
    },
    9: {
        'rn': {
            type: "text", 
            fullName: "Resource Name",
            description: "The name of the resource",
            required:false, 
            disable: false, 
            value: ''
        },
        'lbl': {
            type: "Array", 
            fullName: "Label",
            description: "The label of the resource",
            required:false, 
            disable: false, 
            value: [],
        },
        'mt': {
            type: "Select", 
            fullName: "Member Type",
            description: "The member type of the resource",
            options: Object.fromEntries(Object.entries(resourceType).map(([key, val]) => [val, key])),
            required: true,
            dataType: 'Number', 
            disable:false, 
            value: 0
        },
        'csy': {
            type: "Select", 
            fullName: "Consistency Strategy",
            description: "The consistency strategy of the resource",
            options: {
                1: 'Abandon Member', 
                2: 'Abandon Group', 
                3: 'Set Mixed'
            }, 
            required: false, 
            disable:false, 
            dataType: 'Number',
            value: 0
        },
        'acpi': {
            type: "Array", 
            fullName: "Access Control Policy IDs",
            description: "Resource ID or path of ACP resource to control access to this resource",
            required:false, 
            disable: false, 
            value: []
        },
        'cr': {
            type: "Boolean", 
            fullName: "Creator",
            description: "Choose whether add creator attribute to the resource",
            required:false, 
            disable: false, 
            dataType: 'Boolean',
            value: false
        },
        'mni': {
            type: "Number",
            fullName: "Max Nr of Instances",
            description: "The maximum number of instances of the resource",
            required:false,
            disable: false,
            dataType: 'Number',
            value: 0,
            validation: function (value) { 
                if(value < 0) return false;
                return true;
            }
        },
        'mid':{
            type: "Array",
            fullName: "Member ID",
            description: "Set member ID",
            required:false,
            disable: false,

            value: []
        },
        'gn':{
            type: "text",
            fullName: "Group Name",
            description: "Set group name",
            required:false,
            disable: false,
            value: ''
        },
        'macp':{
            type: "Array",
            fullName: "Member ACP",
            description: "Set member ACP",
            required:false,
            disable: false,
            value: []
        },
        'at': {
            type: "Array",
            fullName: "announceTo",
            description: "Set cse to announce this resource. Can be CSE-ID or URL",
            required:false,
            disable: false,
            value: [],
            validation: function (value) { 
                if(value[0] == '/') return true;
                if(value.substring(0, 7) == 'http://') return true;
                if(value.substring(0, 7) == 'mqtt://') return true;
                if(value.substring(0, 7) == 'coap://') return true;
                return false;
            }
        },
        'aa': {
            type: "Array", 
            fullName: "Announced Attribute",
            description: "Attributes to announce",
            required:false,
            disable: false,
            value: [],
            validation: function (value) { 
                if(Object.keys(resourceAttributes[resourceType.GRP]).indexOf(value) >= 0) return true;
                return false;
            }
        },
        'ast':{
            type: "Select",
            fullName: "Announce Sync Type",
            description: "Set announce sync type",
            options: {
                1: 'UNI DIRECTIONAL',
                2: 'BI DIRECTIONAL'
            },
            required:false,
            disable: false,
            dataType: 'Number',
            value: 0
        },
        'ty': {
            type: "Number", 
            fullName: "Resource Type",
            description: "The resource type of the resource",
            required:true, 
            disable: true, 
            value: 9
        },
    },
    23: {
        'rn': {
            type: "text",
            fullName: "Resource Name",
            description: "The name of the resource",
            required:false, 
            disable: false, 
            value: ''
        },
        'lbl': {
            type: "Array", 
            fullName: "Label",
            description: "The label of the resource",
            required:false, 
            disable: false, 
            value: []
        },
        'acpi': {
            type: "Array", 
            fullName: "Access Control Policy IDs",
            description: "Resource ID or path of ACP resource to control access to this resource",
            required:false, 
            disable: false, 
            value: []
        },
        'cr': {
            type: "Boolean", 
            fullName: "Creator",
            description: "Choose whether add creator attribute to the resource",
            required:false, 
            disable: false, 
            value: false
        },
        // 'net':{
        //     type: "Select",
        //     fullName: "Notification Event Type",
        //     description: "The notification event type of the resource",
        //     options: {
        //         1: 'Update of resource',
        //         2: 'Delete of resource',
        //         3: 'Create of Direct Child resource',
        //         4: 'Delete of Direct Child resource',
        //         5: 'Retrieve of Container resource with no child resource',
        //         6: 'Trigger Received For AE Resource',
        //         7: 'Blocking Update',
        //         8: 'Report on missing data points'
        //     },
        //     required: true,
        //     disable: false,
        //     value: 0
        // },
        'exc': {
            type: "Boolean", 
            fullName: "Expiration Counter",
            description: "Set whether the resource has expiration counter",
            required:false, 
            disable: false, 
            value: false
        },
        'nu': {
            type: "Array", 
            fullName: "Notification URI",
            description: "The notification URI of the resource",
            required:false, 
            disable: false, 
            value: []
        },
        'su': {
            type: "Array", 
            fullName: "Subscriber URI",
            description: "The Subscriber URI of the resource",
            required:false, 
            disable: false, 
            value: []
        },
        'nct': {
            type: "Select", 
            fullName: "Notification Content Type",
            description: "The notification content type of the resource",
            options: {
                1: 'All Attributes',
                2: 'Modified Attributes',
                3: 'Resource ID',
                4: 'Trigger_Payload',
                5: 'TimeSeries notification'
            }, 
            required: true, 
            disable:false, 
            value: 0
        },
        'ty': {
            type: "Number", 
            fullName: "Resource Type",
            description: "The resource type of the resource",
            required:true, 
            disable: true, 
            value: 23
        },
    },
};


// aei 값을 업데이트하는 함수를 추가
export function updateaeiValue(newaei) {
    if(resourceAttributes[2] && resourceAttributes[2]['aei']){
        resourceAttributes[2]['aei'].value = newaei;
    }
}

// aei 값을 가져오는 함수
export function getaei() {
    return resourceAttributes[2] ? resourceAttributes[2]['aei'].value : '';
}