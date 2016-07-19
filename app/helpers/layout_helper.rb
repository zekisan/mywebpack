module LayoutHelper
  def react_component(name, props = {}, &block)
    content_tag(:span, nil, data: { react_class: name, react_props: props }, &block)
  end
end