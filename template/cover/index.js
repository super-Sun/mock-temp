import instance from './instance'
import { convertRESTAPI } from '{{$$.relative("util")}}'

<% _.forEach(data.mocks, function(mock){ %>/** {{mock.description}} */
function {{$$.convertMethod(mock)}}(params) {
  <% if(mock.method == 'post') {%>let opts = { data: params }<%} else {%>let opts = { params: params }<% } %>
  return instance({
    method: '{{mock.method}}',
    url:<% if($$.isREST(mock.url)) {%>convertRESTAPI('{{mock.url}}', opts)<%} else {%> '{{mock.url}}'<% } %>,
    opts: opts
  })
}

<% }) %>export {<% _.forEach(data.mocks, function(mock, i){ %>
  {{$$.convertMethod(mock)}}<% if(data.mocks.length - 1 !== i) { %>,<% } %><% }) %>
}
