class Api::V1::TagsController < ApplicationController
    def index
        # most popular tags at the top, 
        # if same tagging count, sort alphabetically in ascending order
        render json: ActsAsTaggableOn::Tag.all.order(taggings_count: :desc, name: :asc)
    end
end
