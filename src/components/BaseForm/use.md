```js

  // 格式
  // 弹框数据
  modalFormMList = [
    {
      type:'INPUT',
      label:'角色名称',
      field:'ROLENAME',
      placeholder:'请输入角色名'
    },
    {
      type:'INPUT',
      label:'权重',
      field:'WEIGHT',
      placeholder:'请输入权重'
    },
    {
      type: 'SELECT',
      label:'爱好',
      field:'hobby',
      placeholder: 'ssss',
      defaultData: [
        {
          id: 1,
          name: '篮球'
        },
        {
          id: 2,
          name: '排球'
        }  
      ]
    },
    {
      type: 'TAG_SELECT',
      label: '标签',
      field: 'label',
      placeholder: 'ssss',
      defaultData: [
        {
          id: 1,
          name: '音乐爱好'
        },
        {
          id: 2,
          name: '美术'
        },
        {
          id: 3,
          name: '绘画'
        }   
      ]
    },
    {
      type: 'TIME',
      label: '开始时间',
      field: 'startTime',
      placeholder: '请输入开始时间',
      format: 'YYYY-MM-DD'
    }
  ]

  // 初始化值

  this.setState({
    selectedItem: {
      ROLENAME: 'zjj',
      WEIGHT: 20,
      hobby: 1,
      label: [1,2],
      startTime: '2010-5-23'
    }
  })

```