package seg3x02.lab8apigraphql.entity

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

@Document(collection = "user")
data class user(
                var firstName: String,
                var lastName: String,
                var email: String,
                var phone: String){}
