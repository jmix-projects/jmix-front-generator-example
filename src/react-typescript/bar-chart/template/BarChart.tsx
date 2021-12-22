import React from "react";
import {registerScreen} from "@haulmont/jmix-react-web";
import {BarChart} from "@haulmont/jmix-addon-charts";
import {Card, Space} from "antd";
import {gql, useQuery} from "@apollo/client";
import styles from "<%= relDirShift %>./app/App.module.css";
import {RetryDialog} from "@haulmont/jmix-react-antd";

const ROUTING_PATH = '/<%= nameLiteral %>';

const INDEX_BY = "<%= indexBy %>";
const KEYS = <%- include(includesPath('RenderValue'), {data: keys}) %>;

const <%= dollarsToUnderscores(entity.name).toUpperCase() %>_LIST = gql`
  query <%= dollarsToUnderscores(entity.name) %>List($limit: Int, $offset: Int, $orderBy: inp_<%= dollarsToUnderscores(entity.name) %>OrderBy, $filter: [inp_<%= dollarsToUnderscores(entity.name) %>FilterCondition]) {
    <%= dollarsToUnderscores(entity.name) %>Count(filter: $filter)
    <%= dollarsToUnderscores(entity.name) %>List(limit: $limit, offset: $offset, orderBy: $orderBy, filter: $filter) <%= query -%>
  }
`;

const <%= className %> = () => {
  const {loading, data, error, refetch} = useQuery(<%= dollarsToUnderscores(entity.name).toUpperCase() %>_LIST);

  if (error != null) {
    console.error(error);
    return <RetryDialog onRetry={refetch} />;
  }

  return (
    <div className={styles.narrowLayout}>
      <Space direction="vertical" style={{width: "100%"}}>
        <Card size="small" loading={loading}>
          <BarChart
              data={data?.<%= dollarsToUnderscores(entity.name) %>List}
              keys={KEYS}
              indexBy={INDEX_BY}
          />
        </Card>
      </Space>
    </div>
  )
};

registerScreen({
  component: <%= className %>,
  caption: 'screen.<%= className %>',
  screenId: '<%= className %>',
  menuOptions: {
    pathPattern: ROUTING_PATH,
    menuLink: ROUTING_PATH,
  }
});

export default <%= className %>;
